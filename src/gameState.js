export const START = Object.freeze({x:2,y:5});
export function fresh(){return {stage:'menu',flower:null,glass:null,treasure:null,brush:{...START},dug:new Set(),busy:false,moves:0};}
export function select(s,kind,value){if(s.stage!=='create'||s.busy)return false;s[kind]=value;return true;}
export function prepare(s){if(s.flower===null||s.glass===null||s.stage!=='create')return false;s.stage='hide';return true;}
export function hide(s,x,y){if(s.stage!=='hide'||s.busy||!inside(x,y))return false;s.treasure={x,y};s.busy=true;return true;}
export function search(s){if(s.stage!=='hide'||s.busy||!s.treasure)return false;s.stage='search';s.brush={...START};return true;}
export function inside(x,y){return Number.isInteger(x)&&Number.isInteger(y)&&x>=0&&x<6&&y>=0&&y<6;}
export function move(s,dx,dy){if(s.stage!=='search'||s.busy||Math.abs(dx)+Math.abs(dy)!==1)return false;const {x,y}=s.brush;if(!inside(x+dx,y+dy))return false;s.brush={x:x+dx,y:y+dy};s.moves++;s.busy=true;return true;}
export function beginDig(s){if(s.stage!=='search'||s.busy||s.dug.has(key(s.brush)))return false;s.busy=true;return true;}
export function finishDig(s){if(!s.busy||s.stage!=='search')return false;s.dug.add(key(s.brush));s.busy=false;const found=s.brush.x===s.treasure.x&&s.brush.y===s.treasure.y;if(found)s.stage='found';return found;}
export function key(p){return `${p.x},${p.y}`;}
