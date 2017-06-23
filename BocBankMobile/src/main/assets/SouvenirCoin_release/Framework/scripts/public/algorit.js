/*! BUILD: 2016-12-19 */
define("algorit",["zepto"],function(){return Algorithm={Algo_Courts:function(a){var b=!1,c=a.length,d=/^\d{3}[0-6]\d{8}$/,e=/^60357801\d{8}$/;if(d.test(a)){for(var f=["9","8","4","10","1","6","3","5","2","7","1","0"],g=0,h=0;c>h;h++)g+=parseInt(a.charAt(h))*parseInt(f[h]);var i=g%11;0==i&&(b=!0)}else e.test(a)&&(b=!0);return b},Algo_M1:function(a){var b=!1,c=a.length,d=["7","8","5","6","2","4","1","3"],e=0,f=/^[1-9]\d{8}$/;if(f.test(a)){for(var g=0,h=c-1;h>g;g++)e+=parseInt(a.charAt(g))*parseInt(d[g]);var i=e%10*7%10;i==a.charAt(c-1)&&(b=!0)}return b},Algo_SingTel:function(a){var b=!1,c=["128","64","32","16","8","4","2"],d=0,e=a.length,f=/^\d{8}$/;if(f.test(a)){for(var g=0,h=e-1;h>g;g++)d+=parseInt(a.charAt(g))*parseInt(c[g])%11;var i=d%10;i&&(i=10-i),a.charAt(e-1)==i&&(b=!0)}return b},Algo_Starhub_Ltd:function(a){var b=!1,c=a.length,d=a.substring(0,c-1).split(".");if(d.length>1){var e={G:d[0],A:d[1],B:d[2],C:d[3],T:d[4],Z:a.charAt(c-1)};if("1"==e.G)e.A>=1e7&&e.A<=99999999&&(b=!0);else if(e.G>=2&&e.G<=8){var f=Math.pow(10,parseInt(e.G)-1),g=Math.pow(10,parseInt(e.G))-1;e.A>=f&&e.A<=g&&(b=e.B?"00"==e.B||e.B>=10&&e.B<=99?e.C?"00"==e.C||e.C>=10&&e.C<=99?e.T?e.T>1e5&&e.T<999999?!0:!1:!0:!1:!0:!1:!0)}if(b){var h=a.substring(0,c-1).replace(/\./g,""),i=h.length;multiply=["2","9","8","7","6","5","4","3","2","1","2","9","8","7","6","5","4","3","2","1"],mul_len=multiply.length,total=0;for(var j=1;i>=j;j++)total+=parseInt(h.charAt(i-j))*parseInt(multiply[mul_len-j]);var k=total%11,l=["S","T","A","R","H","U","B","L","I","N","K"];b=l[k]==e.Z?!0:!1}}return b},Algo_SunPage_NexwaveTelecom:function(a){var b=!1,c=a.length,d="",e=0;if(8==c){for(var f=0,g=c;g>f;f++)d+=a.charAt(f)*(2-f%2).toString();for(var f=0,g=d.length;g>f;f++)e+=Number(d.charAt(f));e%10==0&&(b=!0)}return b},ALGO_ZONE1511:function(a){var b=!1,c=a.length,d=["8","7","6","5","4","3","2","1"],e=["A","B","C","D","E","F","G","H"],f=0;if(9==c){for(var g=0,h=c-1;h>g;g++)f+=parseInt(a.charAt(g))*parseInt(d[g]);var i=f%8;e[7-i]==a.charAt(c-1)&&(b=!0)}return b},Algo_SP_Services:function(a){var b=!1,c=a.length,d=a.charAt(0),e=a.charAt(c-1);if(10==c&&d>=1&&9>=d&&(e>=0&&9>=e||"-"==e)&&!(a>=89e8&&8999999999>=a||a>=91e8&&9409999999>=a)){for(var f=["4","3","2","7","6","5","4","3","2"],g=0,h=0,i=c-1;i>h;h++)g+=parseInt(a.charAt(h))*parseInt(f[h]);var j=11-g%11;b=j>0&&10>j?parseInt(e)==j:10==j?"-"==e:0==parseInt(e)}if(!b&&(10!=c||"930"!=a.substring(0,3))&&e>=0&&9>=e&&(12==c&&"00"==a.substring(0,2)&&(a=a.substring(2),c=a.length,d=a.charAt(0)),10==c&&(a>=89e8&&8999999999>=a||a>=91e8&&9409999999>=a))){for(var g="",k=0,h=0,i=c-1;i>h;h++)g+=a.charAt(h)*(2-h%2).toString();for(var h=0,i=g.length-1;i>=h;h++)k+=Number(g.charAt(h));var j=10-k%10;b=10==j?0==parseInt(e):parseInt(e)==j}return b},Algo_NTUC_Income:function(a){var b=!1,c=/^\d{11}$/,d=0;if(c.test(a)){for(var e=["7","1","3","7","1","3","7","1","3","7"],f=0,g=a.length-1;g>f;f++)d+=parseInt(a.charAt(f))*parseInt(e[f]);var h=d%10;h&&(h=10-h),b=h==a.charAt(a.length-1)}return b},Algo_Traffic_Police:function(a){var b=!1,c=/^\d{16}$/,d=0,e="345678912345678";if(c.test(a)){for(var f=0,g=a.length-1;g>f;f++)d+=parseInt(a.charAt(f))*parseInt(e.charAt(f));var h=d%11;10==h&&(h=0),b=h==a.charAt(a.length-1)}return b},ALGO_NRIC:function(a){var b=!1,c=/^[ST]\d{7}[ABCDEFGHIZJ]$/;if(reg1=/^[ST][ABCDEFGHIZJ]\d{7}$/,c.test(a)){for(var d=["2","7","6","5","4","3","2"],e=0,f=1;7>=f;f++)e+=parseInt(a.charAt(f))*parseInt(d[f-1]);"T"==a.charAt(0)&&(e+=4);var g=11-e%11,h=["A","B","C","D","E","F","G","H","I","Z","J"];h[g-1]==a.charAt(a.length-1)&&(b=!0)}else if(reg1.test(a)){for(var d=["2","7","6","5","4","3","2"],e=0,f=1;7>=f;f++)e+=parseInt(a.charAt(f+1))*parseInt(d[f-1]);"T"==a.charAt(0)&&(e+=4);var g=11-e%11,h=["A","B","C","D","E","F","G","H","I","Z","J"];h[g-1]==a.charAt(1)&&(b=!0)}return b},Algo_Changi_General_Hospita_NRICNo:function(a){var b=!1,c=a.length,d=/^[STFG][a-zA-Z]\d{7}$/,e=/^[STFG]\d{7}[a-zA-Z]$/,f=/^[XY][a-zA-Z](\d{8}|\d{10})$/,g=/^[XY](\d{8}|\d{10})[a-zA-Z]$/;if(d.test(a))return"F"==a.charAt(0)||"G"==a.charAt(0)?this.ALGO_FIN(a):this.ALGO_NRIC(a);if(e.test(a))return"F"==a.charAt(0)||"G"==a.charAt(0)?this.ALGO_FIN(a):this.ALGO_NRIC(a);if(f.test(a)&&(a=a.charAt(0)+a.substring(2)+a.charAt(1)),!b&&g.test(a)){10==c&&(a=a.charAt(0)+"04"+a.substring(1)),c=a.length;var h=0,i=a.charAt(3),j=a.charAt(4),k=a.charAt(0),l=a.charAt(c-1);h="X"==k?1711*(parseInt(i)+1)*4:1811*(parseInt(i)+1)*4;for(var m=45*(parseInt(j)+1)*2,n=0,o=["7","6","5","4","3","2"],p=0;6>p;p++)n+=parseInt(o[p])*parseInt(a.charAt(5+p));var q=11-(h+m+n)%11,r=["A","B","C","D","E","F","G","H","I","Z","J"];b=l==r[q-1]}return b},Algo_Changi_General_Hospita_TaxNo:function(a,b){var c=!1,d=a.substring(0,2);if("69"==d){var e=/^\d{6}[a-zA-Z]$/,f=a.substring(2,4),g=a.substring(4);c=/^\d{2}$/.test(f)&&parseInt("20"+f)<parseInt(b.substring(0,4))&&e.test(g)}else if("PH"==d){var e=/^PH\d{7,9}$/;c=e.test(a)}else if("70"==d){var e=/^\d{6}[a-zA-Z]\d{4}$/,f=a.substring(2,4),g=a.substring(4);c=/^\d{2}$/.test(f)&&parseInt("20"+f)<parseInt(b.substring(0,4))&&e.test(g)}else{var e=/^20\d{8}[a-zA-Z]$/,f=a.substring(0,4);c=/^\d{4}$/.test(f)&&parseInt(f)<parseInt(b.substring(0,4))&&e.test(a)}return c},Algo_National_Heart_Center:function(a,b){var c=!1;if("HC"==a.substring(0,2)){var d=a.substring(2,4),e=a.substring(4),f=/^\d{5}-?\d{2}$/;/^\d{2}$/.test(d)&&parseInt("20"+d)<parseInt(b.substring(0,4))&&f.test(e)&&parseInt(a.substring(a.length-2,a.length))<=10&&(c=!0)}else if("H1"==a.substring(0,2)){var d=a.substring(2,4),e=a.substring(4),f=/^\d{6}[a-jzA-JZ]-?\d{4}(-?\d{2})?$/;/^\d{2}$/.test(d)&&parseInt("20"+d)<parseInt(b.substring(0,4))&&f.test(e)&&(c=!0)}else if("PHC"==a.substring(0,3)){var d=a.substring(3,5),e=a.substring(5),f=/^\d{5}-?\d{2}$/;/^\d{2}$/.test(d)&&parseInt("20"+d)<parseInt(b.substring(0,4))&&f.test(e)&&parseInt(a.substring(a.length-2,a.length))<=10&&(c=!0)}return c},Algo_National_Heart_Center_NRICNo:function(a){var b=!1,c=a.length,d=/^[STFG][a-zA-Z]\d{7}$/,e=/^[STFG]\d{7}[a-zA-Z]$/,f=/^[XY][a-zA-Z](\d{8}|\d{10})$/,g=/^[XY](\d{8}|\d{10})[a-zA-Z]$/;if(d.test(a)?b=!0:e.test(a)?b=!0:f.test(a)&&(a=a.charAt(0)+a.substring(2)+a.charAt(1)),!b&&g.test(a)){10==c&&(a=a.charAt(0)+"04"+a.substring(1)),c=a.length;var h=0,i=a.charAt(3),j=a.charAt(4),k=a.charAt(0),l=a.charAt(c-1);h="X"==k?1711*(parseInt(i)+1)*4:1811*(parseInt(i)+1)*4;for(var m=43*(parseInt(j)+1)*2,n=0,o=["7","6","5","4","3","2"],p=0;6>p;p++)n+=parseInt(o[p])*parseInt(a.charAt(5+p));var q=11-(h+m+n)%11,r=["A","B","C","D","E","F","G","H","I","Z","J"];b=l==r[q-1]}return b},Algo_KK_Hospital_NRICNo:function(a){var b=/^([a-zA-Z]{2}\d{10})|([a-zA-Z]\d{10}[a-zA-Z])|([a-zA-Z]{2}\d{8})|([a-zA-Z]\d{8}[a-zA-Z])|(70\d{7})$/;return b.test(a)},Algo_KK_Hospital_TaxNo:function(a){var b=!1;if("B"==a.charAt(0)){var c=/^B\d{7}$/;b=c.test(a)}else if("PH"==a.substring(0,2)){var c=/^PH\d{8}[0-9a-zA-Z-]?\d{2}$/;b=c.test(a)}else if(11==a.length){var c=/^\d{10}[A-JZ]$/;b=c.test(a)}else if(a.length>11){var c=/^\d{10}[a-zA-Z]\d+$/;b=c.test(a)}return b},Algo_IRAS_ITR:function(a){var b=!1;if(""==a||void 0==a)return b;var c=[8,7,6,5,4,3,2],d=a.split("-"),e=0,f=/^\d{7}$/,g=["A","C","E","G","J","L","P","R","T","V","Y"],h=["A","C","E","G","J","L","N","P","R","T","Y"],i=[1,3,5,7,10,12,16,18,20,22,25],j=[1,3,5,7,10,12,14,16,18,22,25],k=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];if(3!=d.length)return b;if(2!=d[0].length)return b;var l=d[1];if(7!=l.length||!f.test(l))return b;for(var m=d[0],n=0;n<l.length;n++)e+=parseInt(l[n])*c[n];"Q"==m.charAt(0)&&(e+=9);var o=e%11,p=11-o,q="",r=d[2].charAt(0);if(/^\s$/.test(d[2].charAt(1))||""==d[2].charAt(1))q=0;else{if(isNaN(d[2].charAt(1)))return b;q=parseInt(d[2].charAt(1))}if(0==q)b="Q"==m.charAt(0)?r==g[p-1]:r==h[p-1];else if("Q"==m.charAt(0)){var s=q+q*i[p-1];s>26&&(s-=26),b=r==k[s-1]}else{var s=q+q*j[p-1];s>26&&(s-=26),b=r==k[s-1]}return b},Algo_IRAS_ASSIGNED_ID:function(a){var b=!1,c=/^\d{7}$/,d=[7,6,2,5,4,3,2],e=0,f=["A","B","C","D","E","F","G","H","I","Z","J"];if(!a)return b;if("A"!=a.charAt(0))return b;if(9!=a.length)return!1;var g=a.substr(1,a.length-2);if(!c.test(g))return b;for(var h=0;h<d.length;h++)e+=parseInt(g.charAt(h))*d[h];var i=e%11,j=11-i,k=a.substr(a.length-1);return b=k==f[j-1]},Algo_IRAS_Others:function(a){var b=!1,c=a.length,d=/^\d{14}$/;if(multiply=[13,17,19,23,29,31,37,41,43,47,53,57],checkdigit1=["4","2","1","0","9","8","7","6","5","4","3"],checkdigit2=["3","9","8","7","6","5","4","3","2","1","0"],d.test(a)){for(var e=0,f=0,g=c-2;g>f;f++)e+=parseInt(a.charAt(f))*parseInt(multiply[f]);var h=11-e%11;checkdigit1[h-1]+checkdigit2[h-1]==a.substring(c-2)&&(b=!0)}return b},Algo_IRAS_PropTaxRefNo:function(a){var b=!1,c=/^\d{7}[a-zA-Z]$/,d=a.length;if(c.test(a)){for(var e=["5","7","1","2","3","5","7"],f=["U","S","R","P","N","K","J","G","E","W","A"],g=0,h=0;d-1>h;h++)g+=parseInt(a.charAt(h))*parseInt(e[h]);var i=11-g%11;b=a.substring(d-1)==f[i-1]}return b},ALGO_FIN:function(a){var b=!1,c=/^[FG]\d{7}[KLMNPQRTUWX]$/;if(c.test(a)){for(var d=["2","7","6","5","4","3","2"],e=0,f=1;7>=f;f++)e+=parseInt(a.charAt(f))*parseInt(d[f-1]);"G"==a.charAt(0)&&(e+=4);var g=11-e%11,h=["K","L","M","N","P","Q","R","T","U","W","X"];h[g-1]==a.charAt(a.length-1)&&(b=!0)}return b},ALGO_WORK_PERMIT_NO:function(a){var b=!1,c=/^(\d[ ](\d{8}|\d{7}-))$/;if(c.test(a)){for(var d=["3","","2","7","6","5","4","3","2"],e=0,f=0;8>=f;f++)1!=f&&(e+=parseInt(a.charAt(f))*parseInt(d[f]));e+=11;var g=e%11,h=["0","-","9","8","7","6","5","4","3","2","1"];h[g]==a.charAt(a.length-1)&&(b=!0)}return b},ALGO_IRAS_TAX_NO:function(a){return this.ALGO_NRIC(a)||this.ALGO_FIN(a)||this.ALGO_WORK_PERMIT_NO(a)||this.Algo_IRAS_ITR(a)||this.Algo_IRAS_ASSIGNED_ID(a)||this.Algo_IRAS_PropTaxRefNo(a)},Credit_Luhn_NO:function(a){if(9==a.length)return this.OCBC_Nine_Credit(a);for(var b=a.length,c=a.charAt(b-1),d=a.substring(0,b-1),e=[],f=1,g=0,h=b-2;h>=0;h--){if(f%2==1){var i=2*d.charAt(h)-9;e.push(i>0?i:2*d.charAt(h))}else{var j=d.charAt(h)-9;e.push(j>0?j:d.charAt(h))}f++}for(var h=0;b-2>=h;h++)g+=parseInt(e[h]);return g%10==c},OCBC_Nine_Credit:function(a){for(var b,c=a.length,d=a.charAt(c-1),e=["1","2","3","5","7","8","9","2"],f=0,g=0;7>=g;g++)f+=parseInt(a.charAt(g))*parseInt(e[g]);return b=f%11,0==b||1==b?0==d:d==11-b}}});