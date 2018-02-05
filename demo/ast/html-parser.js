/**
 * 一下是从vue源码中拎出来的2.5.13
 * 暂时不考虑那么多的优化逻辑，只处理核心
 * 就连comment，script，style等节点也暂时不考虑（避免复杂性）
 */
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = '[a-zA-Z_][\\w\\-\\.]*';
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
// 特殊html符号的解码
const decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n',
    '&#9;': '\t'
};
// 编码
const encodedAttr = /&(?:lt|gt|quot|amp);/g;
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

function decodeAttr(value, shouldDecodeNewlines) {
    const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;

    return value.replace(re, match => decodingMap[match]);
}

function parseHTML(html, options) {
    // stack 是用来记录一个层级关系的，用来记录DOM的深度。
    const stack = [];
    const expectHTML = options.expectHTML
    // 判断是否是自闭合
    const isUnaryTag = options.isUnaryTag || no;
    // 左侧打开
    const canBeLeftOpenTag = options.canBeLeftOpenTag || no;

    let index = 0;
    let last;
    let lastTag;

    // 只要有html就一直解析下去
    while (html) {
        last = html;
        // 正常来说，要确保不在plaintext content element中（譬如script/style等）
        // 这里为了简单直接略去，直接默认为非plaintext content element
        let textEnd = html.indexOf('<');

        if (textEnd === 0) {
            // 正常要判断是否是comment、Doctype等，这里略去

            // End tag:
            const endTagMatch = html.match(endTag);

            if (endTagMatch) {
                // 匹配到了结束标签
                const curIndex = index;

                advance(endTagMatch[0].length);
                parseEndTag(endTagMatch[1], curIndex, index);

                continue;
            }

            // Start tag:
            const startTagMatch = parseStartTag();

            if (startTagMatch) {
                handleStartTag(startTagMatch);

                // 正常要判断shouldIgnoreFirstNewline
                continue;
            }
        }

        let text;
        let rest;
        let next;

        if (textEnd >= 0) {
            rest = html.slice(textEnd);
            while (!endTag.test(rest) &&
                !startTagOpen.test(rest) &&
                !comment.test(rest) &&
                !conditionalComment.test(rest)
            ) {
                // < in plain text, be forgiving and treat it as text
                next = rest.indexOf('<', 1);
                if (next < 0) {
                    break;
                }
                textEnd += next;
                rest = html.slice(textEnd);
            }
            text = html.substring(0, textEnd)
            advance(textEnd)
        }

        if (textEnd < 0) {
            text = html;
            html = '';
        }

        if (options.chars && text) {
            options.chars(text);
        }
    }

    // Clean up any remaining tags
    parseEndTag();

    // 往后走n位字符
    function advance(n) {
        index += n
        html = html.substring(n)
    }

    function parseStartTag() {
        const start = html.match(startTagOpen);

        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
                start: index
            };

            advance(start[0].length);

            let end;
            let attr;

            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length);
                match.attrs.push(attr);
            }

            if (end) {
                match.unarySlash = end[1];
                advance(end[0].length);
                match.end = index;

                return match;
            }
        }
    }

    function handleStartTag(match) {
        const tagName = match.tagName;
        const unarySlash = match.unarySlash;

        if (expectHTML) {
            if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
                parseEndTag(lastTag);
            }
            if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
                parseEndTag(tagName);
            }
        }

        const unary = isUnaryTag(tagName) || !!unarySlash;
        const l = match.attrs.length;
        const attrs = new Array(l);

        for (let i = 0; i < l; i++) {
            const args = match.attrs[i];

            const value = args[3] || args[4] || args[5] || '';
            const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href' ?
                options.shouldDecodeNewlinesForHref :
                options.shouldDecodeNewlines;

            attrs[i] = {
                name: args[1],
                value: decodeAttr(value, shouldDecodeNewlines)
            };
        }

        if (!unary) {
            stack.push({
                tag: tagName,
                lowerCasedTag: tagName.toLowerCase(),
                attrs: attrs
            });
            lastTag = tagName;
        }

        if (options.start) {
            options.start(tagName, attrs, unary, match.start, match.end);
        }
    }

// 解析end标签
function parseEndTag(tagName, start, end) {
    let pos;
    let lowerCasedTagName;

    if (start == null) {
        start = index;
    }
    if (end == null) {
        end = index;
    }
    if (tagName) {
        lowerCasedTagName = tagName.toLowerCase();
    }
    // Find the closest opened tag of the same type
    if (tagName) {
        for (pos = stack.length - 1; pos >= 0; pos--) {
            if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                break;
            }
        }
    } else {
        // If no tag name is provided, clean shop
        pos = 0;
    }

    if (pos >= 0) {
        // Close all the open elements, up the stack
        for (let i = stack.length - 1; i >= pos; i--) {
            if (options.end) {
                // 回调最后一个标签
                options.end(stack[i].tag, start, end);
            }
        }

        // Remove the open elements from the stack
        stack.length = pos
        lastTag = pos && stack[pos - 1].tag;

    } else if (lowerCasedTagName === 'br') {
        if (options.start) {
            // 开始回调
            options.start(tagName, [], true, start, end);
        }
    } else if (lowerCasedTagName === 'p') {
        if (options.start) {
            options.start(tagName, [], false, start, end);
        }
        if (options.end) {
            options.end(tagName, start, end);
        }
    }
}

}