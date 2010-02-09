var Facebox=Class.create({initialize:function(a){this.settings={loading_image:"/images/facebox/loading.gif",close_image:"/images/facebox/closelabel.gif",image_types:new RegExp("."+["png","jpg","jpeg","gif"].join("|")+"$","i"),inited:true,facebox_html:'	  <div id="facebox" style="display:none;"> 	    <div class="popup"> 	      <table id="facebox_table"> 	        <tbody> 	          <tr> 	            <td class="tl"/><td class="b"/><td class="tr"/> 	          </tr> 	          <tr> 	            <td class="b"/> 	            <td class="body"> 	              <div class="content"> 	              </div> 	              <div class="footer"> 	                <a href="#" class="close"> 	                  <img src="/images/facebox/closelabel.gif" title="close" class="close_image" /> 	                </a> 	              </div> 	            </td> 	            <td class="b"/> 	          </tr> 	          <tr> 	            <td class="bl"/><td class="b"/><td class="br"/> 	          </tr> 	        </tbody> 	      </table> 	    </div> 	  </div>'};if(a){Object.extend(this.settings,a)}$(document.body).insert({bottom:this.settings.facebox_html});this.preload=[new Image(),new Image()];this.preload[0].src=this.settings.close_image;this.preload[1].src=this.settings.loading_image;f=this;$$("#facebox .b:first, #facebox .bl, #facebox .br, #facebox .tl, #facebox .tr").each(function(b){f.preload.push(new Image());f.preload.slice(-1).src=b.getStyle("background-image").replace(/url\((.+)\)/,"$1")});this.facebox=$("facebox");this.keyPressListener=this.watchKeyPress.bindAsEventListener(this);this.watchClickEvents();fb=this;Event.observe($$("#facebox .close").first(),"click",function(b){Event.stop(b);fb.close()});Event.observe($$("#facebox .close_image").first(),"click",function(b){Event.stop(b);fb.close()})},watchKeyPress:function(a){if(a.keyCode==27||!Event.element(a).descendantOf(this.facebox)){this.close()}},watchClickEvents:function(b){var a=this;$$("a[rel=facebox]").each(function(d,c){Event.observe(d,"click",function(g){Event.stop(g);a.click_handler(d,g)})})},loading:function(){if($$("#facebox .loading").length==1){return true}contentWrapper=$$("#facebox .content").first();contentWrapper.childElements().each(function(c,b){c.remove()});contentWrapper.insert({bottom:'<div class="loading"><img src="'+this.settings.loading_image+'"/></div>'});var a=document.viewport.getScrollOffsets();this.facebox.setStyle({top:a.top+(document.viewport.getHeight()/10)+"px",left:document.viewport.getWidth()/2-(this.facebox.getWidth()/2)+"px"});Event.observe(document,"keypress",this.keyPressListener);Event.observe(document,"click",this.keyPressListener)},reveal:function(b,a){this.loading();load=$$("#facebox .loading").first();if(load){load.remove()}contentWrapper=$$("#facebox .content").first();if(a){contentWrapper.addClassName(a)}contentWrapper.update(b);$$("#facebox .body").first().childElements().each(function(d,c){d.show()});if(!this.facebox.visible()){new Effect.Appear(this.facebox,{duration:0.3})}this.facebox.setStyle({left:document.viewport.getWidth()/2-(this.facebox.getWidth()/2)+"px"});Event.observe(document,"keypress",this.keyPressListener);Event.observe(document,"click",this.keyPressListener)},close:function(){new Effect.Fade("facebox",{duration:0.3})},click_handler:function(c,i){this.loading();Event.stop(i);var k=c.rel.match(/facebox\[\.(\w+)\]/);if(k){k=k[1]}new Effect.Appear(this.facebox,{duration:0.3});if(c.href.match(/#/)){var a=window.location.href.split("#")[0];var j=c.href.replace(a+"#","");var l=$(j);var h=new Element(l.tagName);h.innerHTML=l.innerHTML;this.reveal(h,k)}else{if(c.href.match(this.settings.image_types)){var g=new Image();b=this;g.onload=function(){b.reveal('<div class="image"><img src="'+g.src+'" /></div>',k)};g.src=c.href}else{var b=this;var a=c.href;new Ajax.Request(a,{method:"get",onFailure:function(d){b.reveal(d.responseText,k)},onSuccess:function(d){b.reveal(d.responseText,k)}})}}}});var facebox;document.observe("dom:loaded",function(){facebox=new Facebox()});var WysiHat={};WysiHat.Editor={attach:function(a,c,e){c=$H(c);a=$(a);a.hide();var b=c.get("model")||WysiHat.iFrame;var d=e;return b.create(a,function(h){var g=h.getDocument();var i=h.getWindow();h.load();Event.observe(i,"focus",function(j){h.focus()});Event.observe(i,"blur",function(j){h.blur()});h._observeEvents();if(Prototype.Browser.Gecko){h.execCommand("undo",false,null)}if(d){d(h)}h.focus()})},include:function(a){this.includedModules=this.includedModules||$A([]);this.includedModules.push(a)},extend:function(b){var a=this.includedModules||$A([]);a.each(function(c){Object.extend(b,c)})}};WysiHat.Commands=(function(){function h(){this.execCommand("bold",false,null)}function r(){return this.queryCommandState("bold")}function z(){this.execCommand("underline",false,null)}function s(){return this.queryCommandState("underline")}function n(){this.execCommand("italic",false,null)}function x(){return this.queryCommandState("italic")}function q(){this.execCommand("strikethrough",false,null)}function d(){this.execCommand("blockquote",false,null)}function m(A){this.execCommand("fontname",false,A)}function p(A){this.execCommand("fontsize",false,A)}function y(A){this.execCommand("forecolor",false,A)}function l(A){if(Prototype.Browser.Gecko){this.execCommand("hilitecolor",false,A)}else{this.execCommand("backcolor",false,A)}}function w(A){this.execCommand("justify"+A)}function b(){var A=this.selection.getNode();return Element.getStyle(A,"textAlign")}function g(A){this.execCommand("createLink",false,A)}function i(){var A=this.selection.getNode();if(this.linkSelected()){this.selection.selectNode(A)}this.execCommand("unlink",false,null)}function v(){var A=this.selection.getNode();return A?A.tagName.toUpperCase()=="A":false}function o(A){this.execCommand("formatblock",false,A)}function k(){this.execCommand("insertorderedlist",false,null)}function j(){this.execCommand("insertunorderedlist",false,null)}function c(A){this.execCommand("insertImage",false,A)}function a(B){if(Prototype.Browser.IE){var A=this._selection.getRange();A.pasteHTML(B);A.collapse(false);A.select()}else{this.execCommand("insertHTML",false,B)}}function t(E,D,C){var A=this.getDocument();if(Prototype.Browser.IE){this.selection.restore()}var B=this.commands.get(E);if(B){B.bind(this)(C)}else{A.execCommand(E,D,C)}}function e(C){var A=this.getDocument();var B=this.queryCommands.get(C);if(B){return B.bind(this)()}else{return A.queryCommandState(C)}}function u(){var B=$H({});var A=this;A.styleSelectors.each(function(C){var D=A.selection.getNode();B.set(C.first(),Element.getStyle(D,C.last()))});return B}return{boldSelection:h,boldSelected:r,underlineSelection:z,underlineSelected:s,italicSelection:n,italicSelected:x,strikethroughSelection:q,blockquoteSelection:d,fontSelection:m,fontSizeSelection:p,colorSelection:y,backgroundColorSelection:l,alignSelection:w,alignSelected:b,linkSelection:g,unlinkSelection:i,linkSelected:v,formatblockSelection:o,insertOrderedList:k,insertUnorderedList:j,insertImage:c,insertHTML:a,execCommand:t,queryCommandState:e,getSelectedStyles:u,commands:$H({}),queryCommands:$H({link:v}),styleSelectors:$H({fontname:"fontFamily",fontsize:"fontSize",forecolor:"color",hilitecolor:"backgroundColor",backcolor:"backgroundColor"})}})();WysiHat.Editor.include(WysiHat.Commands);WysiHat.Events=(function(){var a=["click","dblclick","mousedown","mouseup","mouseover","mousemove","mouseout","keypress","keydown","keyup"];function b(j,k){a.each(function(l){Event.observe(j,l,function(m){k.fire("wysihat:"+l)})})}function g(l,j,k){Event.observe(j,"keydown",function(m){if(m.keyCode==86){k.fire("wysihat:paste")}});Event.observe(l,"paste",function(m){k.fire("wysihat:paste")})}function c(k,j){Event.observe(k,"focus",function(l){j.fire("wysihat:focus")});Event.observe(k,"blur",function(l){j.fire("wysihat:blur")})}function i(j,k){Event.observe(j,"mouseup",function(m){var l=k.selection.getRange();if(!l.collapsed){k.fire("wysihat:select")}})}function e(j,k){var l=k.rawContent();Event.observe(j,"keyup",function(n){var m=k.rawContent();if(l!=m){k.fire("wysihat:change");l=m}})}function d(j,l){var m=l.selection.getRange();var k=function(o){var n=l.selection.getRange();if(m!=n){l.fire("wysihat:cursormove");m=n}};Event.observe(j,"keyup",k);Event.observe(j,"mouseup",k)}function h(){if(this._observers_setup){return}var j=this.getDocument();var k=this.getWindow();b(j,this);g(k,j,this);c(k,this);i(j,this);e(j,this);d(j,this);this._observers_setup=true}return{_observeEvents:h}})();WysiHat.Editor.include(WysiHat.Events);WysiHat.Persistence=(function(){function h(i){return i.formatHTMLOutput()}function a(i){return i.formatHTMLInput()}function e(){return this.outputFilter(this.rawContent())}function d(i){this.setRawContent(this.inputFilter(i))}function c(){this.textarea.value=this.content()}function g(){this.setContent(this.textarea.value)}function b(){this.selection.setBookmark();this.save();this.load();this.selection.moveToBookmark()}return{outputFilter:h,inputFilter:a,content:e,setContent:d,save:c,load:g,reload:b}})();WysiHat.Editor.include(WysiHat.Persistence);WysiHat.Window=(function(){function c(){return this.contentDocument||this.contentWindow.document}function b(){if(this.contentDocument&&this.contentDocument.defaultView){return this.contentDocument.defaultView}else{if(this.contentWindow.document){return this.contentWindow}else{return null}}}function a(){this.getWindow().focus();if(this.hasFocus){return}this.hasFocus=true}function d(){this.hasFocus=false}return{getDocument:c,getWindow:b,focus:a,blur:d}})();WysiHat.Editor.include(WysiHat.Window);WysiHat.iFrame={create:function(a,c){var b=new Element("iframe",{id:a.id+"_editor","class":"editor"});Object.extend(b,WysiHat.iFrame.Methods);WysiHat.Editor.extend(b);b.attach(a,c);a.insert({before:b});return b}};WysiHat.iFrame.Methods={attach:function(a,b){this.textarea=a;this.observe("load",function(){try{var c=this.getDocument()}catch(d){return}this.selection=new WysiHat.Selection(this);if(this.ready&&c.designMode=="on"){return}this.setStyle({});c.designMode="on";b(this);this.ready=true;this.fire("wysihat:ready")})},unattach:function(){this.remove()},whenReady:function(b){if(this.ready){b(this)}else{var a=this;a.observe("wysihat:ready",function(){b(a)})}return this},setStyle:function(e){var a=this.getDocument();var c=this;if(!this.ready){return setTimeout(function(){c.setStyle(e)},1)}if(Prototype.Browser.IE){var d=a.createStyleSheet();d.addRule("body","border: 0");d.addRule("p","margin: 0");$H(e).each(function(h){var g=h.first().underscore().dasherize()+": "+h.last();d.addRule("body",g)})}else{if(Prototype.Browser.Opera){var d=Element("style").update("p { margin: 0; }");var b=a.getElementsByTagName("head")[0];b.appendChild(d)}else{Element.setStyle(a.body,e)}}return this},getStyle:function(b){var a=this.getDocument();return Element.getStyle(a.body,b)},rawContent:function(){var a=this.getDocument();if(a.body){return a.body.innerHTML}else{return""}},setRawContent:function(b){var a=this.getDocument();if(a.body){a.body.innerHTML=b}}};WysiHat.Editable={create:function(a,c){var b=new Element("div",{id:a.id+"_editor","class":"editor",contenteditable:"true"});b.textarea=a;WysiHat.Editor.extend(b);Object.extend(b,WysiHat.Editable.Methods);c(b);a.insert({before:b});return b}};WysiHat.Editable.Methods={getDocument:function(){return document},getWindow:function(){return window},rawContent:function(){return this.innerHTML},setRawContent:function(a){this.innerHTML=a}};Object.extend(String.prototype,(function(){function a(){var k=String(this);k=k.tidyXHTML();if(Prototype.Browser.WebKit){k=k.replace(/(<div>)+/g,"\n");k=k.replace(/(<\/div>)+/g,"");k=k.replace(/<p>\s*<\/p>/g,"");k=k.replace(/<br \/>(\n)*/g,"\n")}else{if(Prototype.Browser.Gecko){k=k.replace(/<p>/g,"");k=k.replace(/<\/p>(\n)?/g,"\n");k=k.replace(/<br \/>(\n)*/g,"\n")}else{if(Prototype.Browser.IE||Prototype.Browser.Opera){k=k.replace(/<p>(&nbsp;|&#160;|\s)<\/p>/g,"<p></p>");k=k.replace(/<br \/>/g,"");k=k.replace(/<p>/g,"");k=k.replace(/&nbsp;/g,"");k=k.replace(/<\/p>(\n)?/g,"\n");k=k.gsub(/^<p>/,"");k=k.gsub(/<\/p>$/,"")}}}k=k.gsub(/<b>/,"<strong>");k=k.gsub(/<\/b>/,"</strong>");k=k.gsub(/<i>/,"<em>");k=k.gsub(/<\/i>/,"</em>");k=k.replace(/\n\n+/g,"</p>\n\n<p>");k=k.gsub(/(([^\n])(\n))(?=([^\n]))/,"#{2}<br />\n");k="<p>"+k+"</p>";k=k.replace(/<p>\s*/g,"<p>");k=k.replace(/\s*<\/p>/g,"</p>");var e=Element("body");e.innerHTML=k;if(Prototype.Browser.WebKit||Prototype.Browser.Gecko){var j;do{j=false;e.select("span").each(function(i){if(i.hasClassName("Apple-style-span")){i.removeClassName("Apple-style-span");if(i.className==""){i.removeAttribute("class")}j=true}else{if(i.getStyle("fontWeight")=="bold"){i.setStyle({fontWeight:""});if(i.style.length==0){i.removeAttribute("style")}i.update("<strong>"+i.innerHTML+"</strong>");j=true}else{if(i.getStyle("fontStyle")=="italic"){i.setStyle({fontStyle:""});if(i.style.length==0){i.removeAttribute("style")}i.update("<em>"+i.innerHTML+"</em>");j=true}else{if(i.getStyle("textDecoration")=="underline"){i.setStyle({textDecoration:""});if(i.style.length==0){i.removeAttribute("style")}i.update("<u>"+i.innerHTML+"</u>");j=true}else{if(i.attributes.length==0){i.replace(i.innerHTML);j=true}}}}}})}while(j)}var h=$A(["BR","IMG"]);for(var d=0;d<e.descendants().length;d++){var g=e.descendants()[d];if(g.innerHTML.blank()&&!h.include(g.nodeName)&&g.id!="bookmark"){g.remove()}}k=e.innerHTML;k=k.tidyXHTML();k=k.replace(/<br \/>(\n)*/g,"<br />\n");k=k.replace(/<\/p>\n<p>/g,"</p>\n\n<p>");k=k.replace(/<p>\s*<\/p>/g,"");k=k.replace(/\s*$/g,"");return k}function b(){var e=String(this);var d=Element("body");d.innerHTML=e;if(Prototype.Browser.Gecko||Prototype.Browser.WebKit){d.select("strong").each(function(g){g.replace('<span style="font-weight: bold;">'+g.innerHTML+"</span>")});d.select("em").each(function(g){g.replace('<span style="font-style: italic;">'+g.innerHTML+"</span>")});d.select("u").each(function(g){g.replace('<span style="text-decoration: underline;">'+g.innerHTML+"</span>")})}if(Prototype.Browser.WebKit){d.select("span").each(function(g){if(g.getStyle("fontWeight")=="bold"){g.addClassName("Apple-style-span")}if(g.getStyle("fontStyle")=="italic"){g.addClassName("Apple-style-span")}if(g.getStyle("textDecoration")=="underline"){g.addClassName("Apple-style-span")}})}e=d.innerHTML;e=e.tidyXHTML();e=e.replace(/<\/p>(\n)*<p>/g,"\n\n");e=e.replace(/(\n)?<br( \/)?>(\n)?/g,"\n");e=e.replace(/^<p>/g,"");e=e.replace(/<\/p>$/g,"");if(Prototype.Browser.Gecko){e=e.replace(/\n/g,"<br>");e=e+"<br>"}else{if(Prototype.Browser.WebKit){e=e.replace(/\n/g,"</div><div>");e="<div>"+e+"</div>";e=e.replace(/<div><\/div>/g,"<div><br></div>")}else{if(Prototype.Browser.IE||Prototype.Browser.Opera){e=e.replace(/\n/g,"</p>\n<p>");e="<p>"+e+"</p>";e=e.replace(/<p><\/p>/g,"<p>&nbsp;</p>");e=e.replace(/(<p>&nbsp;<\/p>)+$/g,"")}}}return e}function c(){var d=String(this);d=d.gsub(/\r\n?/,"\n");d=d.gsub(/<([A-Z]+)([^>]*)>/,function(e){return"<"+e[1].toLowerCase()+e[2]+">"});d=d.gsub(/<\/([A-Z]+)>/,function(e){return"</"+e[1].toLowerCase()+">"});d=d.replace(/<br>/g,"<br />");return d}return{formatHTMLOutput:a,formatHTMLInput:b,tidyXHTML:c}})());Object.extend(String.prototype,{sanitize:function(a){return Element("div").update(this).sanitize(a).innerHTML.tidyXHTML()}});Element.addMethods({sanitize:function(c,b){c=$(c);b=$H(b);var a=$A(b.get("tags")||[]);var d=$A(b.get("attributes")||[]);var e=Element(c.nodeName);$A(c.childNodes).each(function(i){if(i.nodeType==1){var g=$(i).sanitize(b).childNodes;if(a.include(i.nodeName.toLowerCase())){var h=Element(i.nodeName);d.each(function(j){if((value=i.readAttribute(j))){h.writeAttribute(j,value)}});e.appendChild(h);$A(g).each(function(j){h.appendChild(j)})}else{$A(g).each(function(j){e.appendChild(j)})}}else{if(i.nodeType==3){e.appendChild(i)}}});return e}});if(typeof Range=="undefined"){Range=function(a){this.ownerDocument=a;this.startContainer=this.ownerDocument.documentElement;this.startOffset=0;this.endContainer=this.ownerDocument.documentElement;this.endOffset=0;this.collapsed=true;this.commonAncestorContainer=this._commonAncestorContainer(this.startContainer,this.endContainer);this.detached=false;this.START_TO_START=0;this.START_TO_END=1;this.END_TO_END=2;this.END_TO_START=3};Range.CLONE_CONTENTS=0;Range.DELETE_CONTENTS=1;Range.EXTRACT_CONTENTS=2;if(!document.createRange){document.createRange=function(){return new Range(this)}}Object.extend(Range.prototype,(function(){function r(){return e(this,Range.CLONE_CONTENTS)}function x(){try{var z=new Range(this.ownerDocument);z.startContainer=this.startContainer;z.startOffset=this.startOffset;z.endContainer=this.endContainer;z.endOffset=this.endOffset;z.collapsed=this.collapsed;z.commonAncestorContainer=this.commonAncestorContainer;z.detached=this.detached;return z}catch(y){return null}}function b(y){if(y){this.endContainer=this.startContainer;this.endOffset=this.startOffset;this.collapsed=true}else{this.startContainer=this.endContainer;this.startOffset=this.endOffset;this.collapsed=true}}function a(z,E){try{var A,D,C,y;A=this.commonAncestorContainer;D=E.commonAncestorContainer;C=A;while(C.parentNode){C=C.parentNode}y=D;while(y.parentNode){y=y.parentNode}switch(z){case this.START_TO_START:return p(this,this.startContainer,this.startOffset,E.startContainer,E.startOffset);break;case this.START_TO_END:return p(this,this.startContainer,this.startOffset,E.endContainer,E.endOffset);break;case this.END_TO_END:return p(this,this.endContainer,this.endOffset,E.endContainer,E.endOffset);break;case this.END_TO_START:return p(this,this.endContainer,this.endOffset,E.startContainer,E.startOffset);break}}catch(B){}return null}function w(){try{e(this,Range.DELETE_CONTENTS)}catch(y){}}function v(){this.detached=true}function o(){try{return e(this,Range.EXTRACT_CONTENTS)}catch(y){return null}}function k(y){try{var C,z,B;switch(this.startContainer.nodeType){case Node.CDATA_SECTION_NODE:case Node.TEXT_NODE:z=this.startContainer.splitText(this.startOffset);this.startContainer.parentNode.insertBefore(y,z);break;default:if(this.startContainer.childNodes.length==0){B=null}else{B=this.startContainer.childNodes(this.startOffset)}this.startContainer.insertBefore(y,B)}}catch(A){}}function d(y){this.setStartBefore(y);this.setEndAfter(y)}function u(y){this.setStart(y,0);this.setEnd(y,y.childNodes.length)}function q(y,C){try{var z,B;this.startContainer=y;this.startOffset=C;z=this.endContainer;while(z.parentNode){z=z.parentNode}B=this.startContainer;while(B.parentNode){B=B.parentNode}if(B!=z){this.collapse(true)}else{if(p(this,this.startContainer,this.startOffset,this.endContainer,this.endOffset)>0){this.collapse(true)}}this.collapsed=t(this);this.commonAncestorContainer=s(this.startContainer,this.endContainer)}catch(A){}}function n(y){this.setStart(y.parentNode,h(y)+1)}function j(y){this.setStart(y.parentNode,h(y))}function i(y,A){try{this.endContainer=y;this.endOffset=A;endRootContainer=this.endContainer;while(endRootContainer.parentNode){endRootContainer=endRootContainer.parentNode}startRootContainer=this.startContainer;while(startRootContainer.parentNode){startRootContainer=startRootContainer.parentNode}if(startRootContainer!=endRootContainer){this.collapse(false)}else{if(p(this,this.startContainer,this.startOffset,this.endContainer,this.endOffset)>0){this.collapse(false)}}this.collapsed=t(this);this.commonAncestorContainer=s(this.startContainer,this.endContainer)}catch(z){}}function g(y){this.setEnd(y.parentNode,h(y)+1)}function l(y){this.setEnd(y.parentNode,h(y))}function m(z){try{var B,y;while(z.firstChild){z.removeChild(z.firstChild)}y=this.extractContents();this.insertNode(z);z.appendChild(y);this.selectNode(z)}catch(A){}}function p(D,B,E,z,C){var G,A,y,F,H;if(B==z){if(E==C){return 0}else{if(E<C){return -1}else{return 1}}}G=z;while(G&&G.parentNode!=B){G=G.parentNode}if(G){A=0;y=B.firstChild;while(y!=G&&A<E){A++;y=y.nextSibling}if(E<=A){return -1}else{return 1}}G=B;while(G&&G.parentNode!=z){G=G.parentNode}if(G){A=0;y=z.firstChild;while(y!=G&&A<C){A++;y=y.nextSibling}if(A<C){return -1}else{return 1}}F=D._commonAncestorContainer(B,z);H=B;while(H&&H.parentNode!=F){H=H.parentNode}if(!H){H=F}childB=z;while(childB&&childB.parentNode!=F){childB=childB.parentNode}if(!childB){childB=F}if(H==childB){return 0}y=F.firstChild;while(y){if(y==H){return -1}if(y==childB){return 1}y=y.nextSibling}return null}function s(A,z){var B=A,y;while(B){y=z;while(y&&B!=y){y=y.parentNode}if(B==y){break}B=B.parentNode}if(!B&&A.ownerDocument){return A.ownerDocument.documentElement}return B}function t(y){return(y.startContainer==y.endContainer&&y.startOffset==y.endOffset)}function c(y){switch(y.nodeType){case Node.CDATA_SECTION_NODE:case Node.COMMENT_NODE:case Node.ELEMENT_NODE:case Node.PROCESSING_INSTRUCTION_NODE:return true;default:return false}}function e(F,N){try{var E,D=null,A=null,y,K,R,O;var P,H,B;var C,L,z;var J,I;var M,G;if(F.collapsed){return null}E=F.commonAncestorContainer;if(F.startContainer!=E){D=F.startContainer;while(D.parentNode!=E){D=D.parentNode}}if(F.endContainer!=E){A=F.endContainer;while(A.parentNode!=E){A=A.parentNode}}if(N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS){y=F.ownerDocument.createDocumentFragment()}if(F.startContainer==F.endContainer){switch(F.startContainer.nodeType){case Node.CDATA_SECTION_NODE:case Node.COMMENT_NODE:case Node.TEXT_NODE:if(N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS){R=F.startContainer.cloneNode();R.deleteData(F.endOffset,F.startContainer.data.length-F.endOffset);R.deleteData(0,F.startOffset);y.appendChild(R)}if(N==Range.EXTRACT_CONTENTS||N==Range.DELETE_CONTENTS){F.startContainer.deleteData(F.startOffset,F.endOffset-F.startOffset)}break;case Node.PROCESSING_INSTRUCTION_NODE:break;default:K=F.startContainer.firstChild;for(O=0;O<F.startOffset;O++){K=K.nextSibling}while(K&&O<F.endOffset){J=K.nextSibling;if(N==Range.EXTRACT_CONTENTS){y.appendChild(K)}else{if(N==Range.CLONE_CONTENTS){y.appendChild(K.cloneNode())}else{F.startContainer.removeChild(K)}}K=J;O++}}F.collapse(true);return y}if(F.startContainer!=E){switch(F.startContainer.nodeType){case Node.CDATA_SECTION_NODE:case Node.COMMENT_NODE:case Node.TEXT_NODE:if(N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS){R=F.startContainer.cloneNode(true);R.deleteData(0,F.startOffset);P=R}if(N==Range.EXTRACT_CONTENTS||N==Range.DELETE_CONTENTS){F.startContainer.deleteData(F.startOffset,F.startContainer.data.length-F.startOffset)}break;case Node.PROCESSING_INSTRUCTION_NODE:break;default:if(N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS){P=F.startContainer.cloneNode(false)}K=F.startContainer.firstChild;for(O=0;O<F.startOffset;O++){K=K.nextSibling}while(K&&O<F.endOffset){J=K.nextSibling;if(N==Range.EXTRACT_CONTENTS){y.appendChild(K)}else{if(N==Range.CLONE_CONTENTS){y.appendChild(K.cloneNode())}else{F.startContainer.removeChild(K)}}K=J;O++}}H=F.startContainer.parentNode;K=F.startContainer.nextSibling;for(;H!=E;H=H.parentNode){if(N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS){B=H.cloneNode(false);B.appendChild(P);P=B}for(;K;K=J){J=K.nextSibling;if(N==Range.EXTRACT_CONTENTS){P.appendChild(K)}else{if(N==Range.CLONE_CONTENTS){P.appendChild(K.cloneNode(true))}else{H.removeChild(K)}}}K=H.nextSibling}}if(F.endContainer!=E){switch(F.endContainer.nodeType){case Node.CDATA_SECTION_NODE:case Node.COMMENT_NODE:case Node.TEXT_NODE:if(N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS){R=F.endContainer.cloneNode(true);R.deleteData(F.endOffset,F.endContainer.data.length-F.endOffset);C=R}if(N==Range.EXTRACT_CONTENTS||N==Range.DELETE_CONTENTS){F.endContainer.deleteData(0,F.endOffset)}break;case Node.PROCESSING_INSTRUCTION_NODE:break;default:if(N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS){C=F.endContainer.cloneNode(false)}K=F.endContainer.firstChild;if(K&&F.endOffset){for(O=0;O+1<F.endOffset;O++){J=K.nextSibling;if(!J){break}K=J}for(;K;K=I){I=K.previousSibling;if(N==Range.EXTRACT_CONTENTS){C.insertBefore(K,C.firstChild)}else{if(N==Range.CLONE_CONTENTS){C.insertBefore(K.cloneNode(True),C.firstChild)}else{F.endContainer.removeChild(K)}}}}}L=F.endContainer.parentNode;K=F.endContainer.previousSibling;for(;L!=E;L=L.parentNode){if(N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS){z=C.cloneNode(false);z.appendChild(C);C=z}for(;K;K=I){I=K.previousSibling;if(N==Range.EXTRACT_CONTENTS){C.insertBefore(K,C.firstChild)}else{if(N==Range.CLONE_CONTENTS){C.appendChild(K.cloneNode(true),C.firstChild)}else{L.removeChild(K)}}}K=L.previousSibling}}if(F.startContainer==E){M=F.startContainer.firstChild;for(O=0;O<F.startOffset;O++){M=M.nextSibling}}else{M=F.startContainer;while(M.parentNode!=E){M=M.parentNode}M=M.nextSibling}if(F.endContainer==E){G=F.endContainer.firstChild;for(O=0;O<F.endOffset;O++){G=G.nextSibling}}else{G=F.endContainer;while(G.parentNode!=E){G=G.parentNode}}if((N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS)&&P){y.appendChild(P)}if(M){for(K=M;K&&K!=G;K=J){J=K.nextSibling;if(N==Range.EXTRACT_CONTENTS){y.appendChild(K)}else{if(N==Range.CLONE_CONTENTS){y.appendChild(K.cloneNode(true))}else{E.removeChild(K)}}}}if((N==Range.EXTRACT_CONTENTS||N==Range.CLONE_CONTENTS)&&C){y.appendChild(C)}if(N==Range.EXTRACT_CONTENTS||N==Range.DELETE_CONTENTS){if(!D&&!A){F.collapse(true)}else{if(D){F.startContainer=D.parentNode;F.endContainer=D.parentNode;F.startOffset=F.endOffset=F._nodeIndex(D)+1}else{if(A){F.startContainer=A.parentNode;F.endContainer=A.parentNode;F.startOffset=F.endOffset=F._nodeIndex(A)}}}}return y}catch(Q){return null}}function h(y){var z=0;while(y.previousSibling){z++;y=y.previousSibling}return z}return{setStart:q,setEnd:i,setStartBefore:j,setStartAfter:n,setEndBefore:l,setEndAfter:g,collapse:b,selectNode:d,selectNodeContents:u,compareBoundaryPoints:a,deleteContents:w,extractContents:o,cloneContents:r,insertNode:k,surroundContents:m,cloneRange:x,toString:toString,detach:v,_commonAncestorContainer:s}})())}if(!window.getSelection){window.getSelection=function(){return Selection.getInstance()};SelectionImpl=function(){this.anchorNode=null;this.anchorOffset=0;this.focusNode=null;this.focusOffset=0;this.isCollapsed=true;this.rangeCount=0;this.ranges=[]};Object.extend(SelectionImpl.prototype,(function(){function l(o){return true}function k(){return true}function i(){return true}function h(){return true}function c(){return true}function b(){this.anchorNode=null;this.anchorOffset=0;this.focusNode=null;this.focusOffset=0;this.isCollapsed=true;this.rangeCount=0;this.ranges=[]}function n(t){if(t.startContainer.nodeType!=Node.TEXT_NODE){var v=this._getRightStart(t.startContainer);var o=0}else{var v=t.startContainer;var o=t.startOffset}if(t.endContainer.nodeType!=Node.TEXT_NODE){var p=this._getRightEnd(t.endContainer);var s=p.data.length}else{var p=t.endContainer;var s=t.endOffset}var q=this._selectStart(v,o);var u=this._selectEnd(p,s);q.setEndPoint("EndToStart",u);q.select();document.selection._selectedRange=t}function g(p,o){if(p.nodeType!=Node.TEXT_NODE){if(p.nodeType==Node.ELEMENT_NODE){p=p.childNodes(o)}return a(p)}else{return null}}function m(o,p){if(o.nodeType!=Node.TEXT_NODE){if(o.nodeType==Node.ELEMENT_NODE){o=o.childNodes(p)}return e(o)}else{return null}}function d(v,u){var q=document.body.createTextRange();if(v.nodeType==Node.TEXT_NODE){var s=u,p=v;var o=null,t=true;while(p.previousSibling){switch(p.previousSibling.nodeType){case Node.ELEMENT_NODE:o=p.previousSibling;t=false;break;case Node.TEXT_NODE:s+=p.previousSibling.data.length}if(o!=null){break}p=p.previousSibling}if(o==null){o=v.parentNode}q.moveToElementText(o);q.collapse(t);q.move("Character",s);return q}else{return null}}function j(o,v){var s=document.body.createTextRange(),q=o;if(o.nodeType==3){var t=o.data.length-v;var p=null,u=false;while(q.nextSibling){switch(q.nextSibling.nodeType){case Node.ELEMENT_NODE:p=q.nextSibling;u=true;break;case Node.TEXT_NODE:t+=q.nextSibling.data.length;break}if(p!=null){break}q=q.nextSibling}if(p==null){p=o.parentNode;u=false}switch(p.nodeName.toLowerCase()){case"p":case"div":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":t++}s.moveToElementText(p);s.collapse(u);s.move("Character",-t);return s}return null}function e(p){var o=[];var q=null;while(p){o=[];q=p;while(q){while(q){if(q.nodeType==3&&q.data.replace(/^\s+|\s+$/,"").length){return q}if(q.previousSibling){o.push(q.previousSibling)}q=q.lastChild}q=o.pop()}p=p.previousSibling}return null}function a(p){var o=[];var q=null;while(p){o=[];q=p;while(q){while(q){if(q.nodeType==3&&q.data.replace(/^\s+|\s+$/,"").length){return q}if(q.nextSibling){o.push(q.nextSibling)}q=q.firstChild}q=o.pop()}p=p.nextSibling}return null}return{removeAllRanges:b,_addRange:n,_getRightStart:g,_getRightEnd:m,_selectStart:d,_selectEnd:j}})());Selection=new function(){var a=null;this.getInstance=function(){if(a==null){return(a=new SelectionImpl())}else{return a}}}}Object.extend(Range.prototype,(function(){function a(){var b=this.commonAncestorContainer;if(this.startContainer==this.endContainer){if(this.startOffset-this.endOffset<2){b=this.startContainer.childNodes[this.startOffset]}}while(b.nodeType==Node.TEXT_NODE){b=b.parentNode}return b}return{getNode:a}})());WysiHat.Selection=Class.create((function(){function g(n){this.window=n.getWindow();this.document=n.getDocument();if(Prototype.Browser.IE){n.observe("wysihat:cursormove",i.bind(this));n.observe("wysihat:focus",m)}}function e(){return this.window.getSelection?this.window.getSelection():this.document.selection}function a(){var n=null,o=this.getSelection();try{if(o.getRangeAt){n=o.getRangeAt(0)}else{n=o.createRange()}}catch(p){return null}if(Prototype.Browser.WebKit){n.setStart(o.baseNode,o.baseOffset);n.setEnd(o.extentNode,o.extentOffset)}return n}function d(p){var o=this.getSelection();if(Prototype.Browser.IE){var n=h(this.document,p);n.select()}else{if(Prototype.Browser.WebKit){o.setBaseAndExtent(p,0,p,p.innerText.length)}else{if(Prototype.Browser.Opera){n=this.document.createRange();n.selectNode(p);o.removeAllRanges();o.addRange(n)}else{var n=h(this.document,p);o.removeAllRanges();o.addRange(n)}}}}function c(){var n=null,s=[],q,p;var t=this.getRange();if(!t){return null}var u;if(t.parentElement){u=t.parentElement()}else{u=t.commonAncestorContainer}if(u){while(u.nodeType!=1){u=u.parentNode}if(u.nodeName.toLowerCase()!="body"){p=u;do{p=p.parentNode;s[s.length]=p}while(p.nodeName.toLowerCase()!="body")}q=u.all||u.getElementsByTagName("*");for(var r=0;r<q.length;r++){s[s.length]=q[r]}n=[u];for(var v=0,o;v<s.length;v++){o=h(this.document,s[v]);if(o&&b(t,o)){n[n.length]=s[v]}}}return n.first()}function h(n,p){if(n.body.createTextRange){var o=n.body.createTextRange();o.moveToElementText(p)}else{if(n.createRange){var o=n.createRange();o.selectNodeContents(p)}}return o}function b(o,n){if(o.compareEndPoints){return !(n.compareEndPoints("StartToStart",o)==1&&n.compareEndPoints("EndToEnd",o)==1&&n.compareEndPoints("StartToEnd",o)==1&&n.compareEndPoints("EndToStart",o)==1||n.compareEndPoints("StartToStart",o)==-1&&n.compareEndPoints("EndToEnd",o)==-1&&n.compareEndPoints("StartToEnd",o)==-1&&n.compareEndPoints("EndToStart",o)==-1)}else{if(o.compareBoundaryPoints){return !(n.compareBoundaryPoints(0,o)==1&&n.compareBoundaryPoints(2,o)==1&&n.compareBoundaryPoints(1,o)==1&&n.compareBoundaryPoints(3,o)==1||n.compareBoundaryPoints(0,o)==-1&&n.compareBoundaryPoints(2,o)==-1&&n.compareBoundaryPoints(1,o)==-1&&n.compareBoundaryPoints(3,o)==-1)}}return null}function l(){var p=this.document.getElementById("bookmark");if(p){p.parentNode.removeChild(p)}p=this.document.createElement("span");p.id="bookmark";p.innerHTML="&nbsp;";if(Prototype.Browser.IE){var n=this.document.selection.createRange();var o=this.document.createElement("div");o.appendChild(p);n.collapse();n.pasteHTML(o.innerHTML)}else{var n=this.getRange();n.insertNode(p)}}function k(){var p=this.document.getElementById("bookmark");if(!p){return}if(Prototype.Browser.IE){var n=this.getRange();n.moveToElementText(p);n.collapse();n.select()}else{if(Prototype.Browser.WebKit){var o=this.getSelection();o.setBaseAndExtent(p,0,p,0)}else{var n=this.getRange();n.setStartBefore(p)}}p.parentNode.removeChild(p)}var j=null;function i(){j=this.getRange()}function m(){if(j){j.select()}}return{initialize:g,getSelection:e,getRange:a,getNode:c,selectNode:d,setBookmark:l,moveToBookmark:k,restore:m}})());WysiHat.Toolbar=Class.create((function(){function e(l){this.editor=l;this.element=this.createToolbarElement()}function a(){var l=new Element("div",{"class":"editor_toolbar"});this.editor.insert({before:l});return l}function d(m){var l=this;$A(m).each(function(n){l.addButton(n)})}function j(m,o){m=$H(m);if(!m.get("name")){m.set("name",m.get("label").toLowerCase())}var l=m.get("name");var n=this.createButtonElement(this.element,m);var o=this.buttonHandler(l,m);this.observeButtonClick(n,o);var o=this.buttonStateHandler(l,m);this.observeStateChanges(n,l,o)}function i(n,l){var m=new Element("a",{"class":"button",href:"#"});m.update("<span>"+l.get("label")+"</span>");m.addClassName(l.get("name"));n.appendChild(m);return m}function k(m,l){if(l.handler){return l.handler}else{if(l.get("handler")){return l.get("handler")}else{return function(n){n.execCommand(m)}}}}function g(l,m){var n=this;l.observe("click",function(o){m(n.editor);n.editor.fire("wysihat:change");n.editor.fire("wysihat:cursormove");Event.stop(o)})}function c(m,l){if(l.query){return l.query}else{if(l.get("query")){return l.get("query")}else{return function(n){return n.queryCommandState(m)}}}}function h(n,m,o){var p=this;var l=false;p.editor.observe("wysihat:cursormove",function(q){var r=o(p.editor);if(r!=l){l=r;p.updateButtonState(n,m,r)}})}function b(m,l,n){if(n){m.addClassName("selected")}else{m.removeClassName("selected")}}return{initialize:e,createToolbarElement:a,addButtonSet:d,addButton:j,createButtonElement:i,buttonHandler:k,observeButtonClick:g,buttonStateHandler:c,observeStateChanges:h,updateButtonState:b}})());WysiHat.Toolbar.ButtonSets={};WysiHat.Toolbar.ButtonSets.Basic=$A([{label:"Bold"},{label:"Underline"},{label:"Italic"}]);var editors=[];var WysihatHelper={faceboxFile:function(){facebox.loading();new Effect.Appear($("facebox"),{duration:0.3});var b=facebox;var a="/wysihat_files/?editor="+this.id;new Ajax.Request(a,{method:"get",onFailure:function(c){b.reveal(c.responseText,null)},onSuccess:function(c){b.reveal(c.responseText,null)}})},faceboxFilez:function(){facebox.loading();new Effect.Appear($("facebox"),{duration:0.3});var b=facebox;var a="/wysihat_files/?type=file&editor="+this.id;new Ajax.Request(a,{method:"get",onFailure:function(c){b.reveal(c.responseText,null)},onSuccess:function(c){b.reveal(c.responseText,null)}})},faceboxLink:function(){if(this.linkSelected()){this.unlinkSelection()}else{facebox.loading();new Effect.Appear($("facebox"),{duration:0.3});iframe=this;facebox.reveal('<input type="text" id="link_field" style="width:100%;"/>',null);Event.observe("link_field","change",function(a){iframe.linkSelection($("link_field").value)})}},faceboxHTML:function(){facebox.loading();new Effect.Appear($("facebox"),{duration:0.3});iframe=this;facebox.reveal('<textarea id="html_editor" style="width:100%; height:400px;">'+iframe.contentWindow.document.body.innerHTML+"</textarea>",null);Event.observe("html_editor","change",function(a){iframe.contentWindow.document.body.innerHTML=$("html_editor").value})},faceboxPaste:function(){facebox.loading();new Effect.Appear($("facebox"),{duration:0.3});iframe=this;facebox.reveal('<textarea id="paste_editor" style="width:100%; height:400px;"></textarea>',null);Event.observe("paste_editor","change",function(a){iframe.contentWindow.document.body.innerHTML=iframe.contentWindow.document.body.innerHTML+$("paste_editor").value.escapeHTML()})}};function wysiHatify(d,c){WysiHat.Editor.include(WysihatHelper);var a=WysiHat.Editor.attach(d);var b=new WysiHat.Toolbar(a);editors.push(a);$$("form").each(function(e){e.onsubmit=function(){editors.each(function(g){g.save()})}});c.each(function(e){switch(e.toLowerCase()){case"image":b.addButton({label:e.gsub("_","-").camelize().capitalize(),handler:function(g){return g.faceboxFile(g)}});break;case"file":b.addButton({label:e.gsub("_","-").camelize().capitalize(),handler:function(g){return g.faceboxFilez(g)}});break;case"link":b.addButton({label:e.gsub("_","-").camelize().capitalize(),handler:function(g){return g.faceboxLink(g)}});break;case"html":b.addButton({label:e.gsub("_","-").camelize().capitalize(),handler:function(g){return g.faceboxHTML(g)}});break;case"paste":b.addButton({label:e.gsub("_","-").camelize().capitalize(),handler:function(g){return g.faceboxPaste(g)}});break;case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":case"p":b.addButton({label:e.gsub("_","-").camelize().capitalize(),handler:function(g){return g.formatblockSelection(e.toLowerCase())}});break;default:b.addButton({label:e.gsub("_","-").camelize().capitalize()})}})};