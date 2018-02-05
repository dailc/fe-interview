/**
 * 生成一个map，并返回一个函数，
 * 函数的作用是检查某个key是否在map中
 */
function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    const len = list.length;

    for (let i = 0; i < len; i++) {
        map[list[i]] = true;
    }

    return expectsLowerCase ?
        val => map[val.toLowerCase()] :
        val => map[val];
}

// 恒返回false的一个函数
const no = () => false;

const isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);