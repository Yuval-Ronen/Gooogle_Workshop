(this.webpackJsonpgoogle=this.webpackJsonpgoogle||[]).push([[0],{110:function(e,t,n){e.exports={container:"trainee_displayer_container__2IcVY",title:"trainee_displayer_title__1I_iQ",length:"trainee_displayer_length__1sUFm",bigImg:"trainee_displayer_bigImg__3oKbe",img:"trainee_displayer_img__1bw65","image-cropper":"trainee_displayer_image-cropper__1A6sI",bigDescription:"trainee_displayer_bigDescription__2ROBv",description:"trainee_displayer_description__3CHK7"}},125:function(e,t,n){e.exports={container:"all_trainee_result_container__2sgtF",traineeResult:"all_trainee_result_traineeResult__Wb-wT"}},169:function(e,t,n){},180:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(7),c=n.n(i),s=n(38),o=n(67),l=n(137),u="SET_USER_DATA",j=function(e){return console.log("action to set user data:"),console.log(e),{type:u,payload:e}},d=function(e){return console.log("action to set new state:"),console.log(e),{type:u,payload:e}},b={},h=Object(o.c)({authenticationData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u:return t.payload;default:return e}},currentState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u:return t.payload;default:return e}}}),p=[l.a],O=Object(o.d)(h,{},o.a.apply(void 0,p)),x=(n(169),n(71)),m=n(23),f=n(13),g=n(79),v=n(43),y=(n(121),n(2)),_=function(e){return Object(y.jsx)("div",{children:Object(y.jsx)("h1",{children:" trainer trainee page"})})},T=n(32),w=n(25),k=n(36),N=n(106),C=n(128),P=n(109),S=n.n(P),I=(n(172),Object(C.b)(S.a)),D=function(e){Object(k.a)(n,e);var t=Object(N.a)(n);function n(){var e;Object(T.a)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={events:[{start:S()().toDate(),end:S()().add(1,"days").toDate(),title:"Some title"}]},e}return Object(w.a)(n,[{key:"render",value:function(){return Object(y.jsx)("div",{className:"App",children:Object(y.jsx)(C.a,{localizer:I,defaultDate:new Date,defaultView:"month",events:this.state.events,style:{height:"100vh"}})})}}]),n}(r.Component),A=function(e){return Object(y.jsxs)("div",{className:"trainer-exercise-schedule",children:[Object(y.jsx)("h1",{children:"\u05dc\u05d5\u05d7 \u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd"}),Object(y.jsx)(D,{})]})},K=n.p+"static/media/1.48d1a770.jpg",U=n(125),L=n.n(U),M=n(110),E=n.n(M),F=function(e,t){return Object(y.jsx)("div",{children:"hey"})},H=function(e){var t=e.trainee;return Object(y.jsxs)("div",{className:E.a.container,children:[Object(y.jsx)("div",{className:E.a.title,children:t.first_name+" "+t.last_name}),Object(y.jsx)("div",{className:E.a.img,children:Object(y.jsx)("img",{src:t.image,alt:"no-pic",class:"rounded-circle"})})]})},V=function(e){var t=e.listOfTrainees,n=Object(r.useState)([]),a=Object(f.a)(n,2),i=a[0],c=a[1],s=Object(r.useState)([]),o=Object(f.a)(s,2),l=o[0],u=o[1];return Object(y.jsxs)("div",{className:L.a.container,onClick:function(){c([{trainDate:"trainDate",trainTime:"trainTime",group_members:"group_members",description:"description",type:"type"}]),u([{date:"date",link:"link"}])},children:[Object(y.jsx)(F,{listHistory:i,listProgram:l}),(null===t||void 0===t?void 0:t.length)>0&&t.map((function(e,t){return Object(y.jsx)("div",{className:L.a.traineeResult,children:Object(y.jsx)("a",{href:"/TrainerPage/trainee?id=".concat(e.trainer_id),children:Object(y.jsx)(H,{trainee:e})})},e.first_name+e.last_name+t)}))]})},R=n(217),G=function(e){var t=[{trainer_id:"100000001",first_name:"trainer",last_name:"1",image:"https://lh3.google.com/u/0/pgc/AF1QipMlgq9oWHdLOhaTf9Vdun1ojNMz0T9sSWNHtgXI=w464-h210-no-iv69582"},{trainer_id:"100000002",first_name:"trainer",last_name:"2",image:K},{trainer_id:"100000003",first_name:"trainer",last_name:"3",image:"https://lh3.googleusercontent.com/o6BrjsyJBg0dN28TlOdGIhRCuvE5wu8JXCVs2IVwQXxkVPZxj4TGVRmRA0itt9obp71Y1Vz1-69zx17rBU98c2wQhwf_E3dMEC0fGI20oJACzGyvthdmuRi0X1eKjOPsf5tMIOjU8EG7eiA0TBKTwtS38xHCGiEOYAsa1o6X3eLqxFTJxHx_E0ujKyUzGwuxruNZxVOMR_xKtSOUhd9O-D1FnMXaUkAMLFs4LsnjUUWIJR9MK7xJ8A6dB1bCrAX-mNe-PYxKkYMQgMqE5CBAulCM4hbsEFx7YbcwLnnb5csha7eoif4Pgw4BLL3N3pgNIe3TjbEoQhquNP-S2NOwMFA3KF27YWSNP_cbL8WgD-iUX1YtBOyNocNfzmHzHXjx4wW_loNL1uLKr2UjVK1pqNREOh0ggHUGIbNYUEhNk3zK_gN_Bgq2ai6tiC-vyGKcXF-oHn3FLbP4spS9YMnf0TgGX7QTMg7qXpEUjV8798M6KMyTGqgJU-YjXasLdf3K-AN1Ox9TmeL7T4KSd44nykS8iew_hfQ-J-Ul23lR5Vs7N5HTUpgBCp5KNyA_vINiFHGxjSLDeUrmfbNHXR4rvLKbzP7VOepTw9_V173f-QJuW01wUigFTknAwJfdSPhgsYYdUGECHHw3EzqJIeMMlmMRycp2MdZ-eepGVrOZh-DIjxKz_VNWDP2VM5EdFc3MZj-I1Xoj3hWwvnicx5C5ZbEgIQ=w1920-h867-no?authuser=0"},{trainer_id:"100000004",first_name:"trainer",last_name:"4",image:"null"},{trainer_id:"100000005",first_name:"trainer",last_name:"5",image:"null"},{trainer_id:"100000006",first_name:"trainer",last_name:"6",image:"null"},{trainer_id:"100000007",first_name:"trainer",last_name:"7",image:"null"},{trainer_id:"100000008",first_name:"trainer",last_name:"8",image:"null"},{trainer_id:"100000009",first_name:"trainer",last_name:"9",image:"null"},{trainer_id:"100000010",first_name:"trainer",last_name:"10",image:"null"},{trainer_id:"100000011",first_name:"trainer",last_name:"11",image:"null"}];return Object(y.jsx)(R.a,{children:Object(y.jsx)(V,{listOfTrainees:t})})},W=function(e){return Object(y.jsx)("div",{children:Object(y.jsx)("h1",{children:"\u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd"})})},B=function(e){return Object(y.jsx)("div",{className:"exercise-history",children:Object(y.jsx)("h1",{children:"\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d9\u05ea \u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd"})})},J=function(){return Object(y.jsx)("div",{className:"trainer-page-content",children:Object(y.jsxs)(m.d,{children:[Object(y.jsx)(m.b,{exact:!0,path:"/TrainerPage/trainee",component:_}),Object(y.jsx)(m.b,{exact:!0,path:"/TrainerPage/exercise_schedule",component:A}),Object(y.jsx)(m.b,{exact:!0,path:"/TrainerPage/trainees",component:G}),Object(y.jsx)(m.b,{exact:!0,path:"/TrainerPage/exercise_pictures",component:W}),Object(y.jsx)(m.b,{exact:!0,path:"/TrainerPage/exercise_history",component:B})]})})},z=n(29),X=n(22),Y=n(57),q=n.n(Y),Q=function(e){Object(k.a)(n,e);var t=Object(N.a)(n);function n(e){var r;return Object(T.a)(this,n),(r=t.call(this,e)).state={loggedOut:!1},r.logout=function(){console.log("logged out!"),r.props.setUserData({}),r.props.setCurState(""),r.setState({loggedOut:!0})},console.log(e),r}return Object(w.a)(n,[{key:"render",value:function(){return this.state.loggedOut?Object(y.jsx)(m.a,{to:"/"}):Object(y.jsx)("div",{children:Object(y.jsx)(Y.GoogleLogout,{clientId:"476408447979-ksp3ikmql53717ucvohu0uhm8t7ld9f1.apps.googleusercontent.com",render:function(e){return Object(y.jsx)(X.a.Item,{children:Object(y.jsx)(X.a.Link,{eventKey:"fifth",onClick:e.onClick,children:Object(y.jsxs)("text",{style:{color:"red"},children:["\u05d4\u05ea\u05e0\u05ea\u05e7/\u05d9 \u05de\u05d4\u05d7\u05e9\u05d1\u05d5\u05df ",Object(y.jsx)(z.f,{})]})})})},onLogoutSuccess:this.logout,onLogoutFailure:function(e){return console.log(e)}})})}}]),n}(a.a.Component),Z={setUserData:j,setCurState:d},$=Object(s.b)((function(e){return{authenticationData:e.authenticationData,currentState:e.currentState}}),Z)(Q),ee=n(11),te=n(3),ne=n(111),re=n(231),ae=n(185),ie=n(182),ce=n(181),se=n(222),oe=n(24),le=n(223),ue=n(233),je=n(144),de=n(232),be=n(226),he=n(229),pe=n(145),Oe=n(55),xe=n(58),me=n(227),fe=n(6),ge=n(224),ve=n(235),ye=n(234);var _e=Object(fe.a)({root:{background:"white",borderRadius:3,border:"1px solid blue",borderColor:"#b2102f",color:"#b2102f",height:48,width:"90%",padding:"0 30px",margin:"10px",fontSize:16,fontFamily:"Segoe UI"}})((function(e){var t=Object(pe.a)({direction:"rtl"}),n=a.a.useState(!1),r=Object(f.a)(n,2),i=r[0],c=r[1],s=function(){c(!1)},o=e.classes,l=e.children,u=e.AddButtonDialog,j=a.a.useState(new Date),d=Object(f.a)(j,2),b=d[0],h=d[1],p=function(e){h(e)},O=Object(Oe.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:150},selectEmpty:{marginTop:e.spacing(2)}}}))(),x=a.a.useState({type:""}),m=Object(f.a)(x,2),g=m[0],v=m[1],_={PaperProps:{style:{maxHeight:224,width:250}}};function T(e,t,n){return{fontWeight:-1===t.indexOf(e)?n.typography.fontWeightRegular:n.typography.fontWeightMedium}}var w=Object(Oe.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:150},chips:{display:"flex",flexWrap:"wrap"},chip:{margin:2}}}))(),k=Object(xe.a)(),N=a.a.useState([]),C=Object(f.a)(N,2),P=C[0],S=C[1];return Object(y.jsxs)("div",{children:[Object(y.jsxs)(ne.a,{className:Object(te.a)(o.root,u),onClick:function(){c(!0)},children:[l||"\u05d4\u05d5\u05e1\u05e4\u05ea \u05d0\u05d9\u05de\u05d5\u05df  ","  ",Object(y.jsx)(z.d,{})]}),Object(y.jsxs)(ae.a,{open:i,onClose:s,"aria-labelledby":"form-dialog-title",children:[Object(y.jsx)(se.a,{id:"form-dialog-title",children:"\u05d4\u05d5\u05e1\u05e4\u05ea \u05d0\u05d9\u05de\u05d5\u05df"}),Object(y.jsxs)(ce.a,{children:[Object(y.jsx)("div",{children:Object(y.jsxs)(oe.a,{utils:je.a,children:[Object(y.jsx)(le.a,{margin:"normal",id:"date-picker-dialog",label:"Date",format:"MM/dd/yyyy",value:b,onChange:p,KeyboardButtonProps:{"aria-label":"change date"}}),Object(y.jsx)(ue.a,{margin:"normal",id:"time-picker",label:"Time",value:b,onChange:p,ampm:!1,KeyboardButtonProps:{"aria-label":"change time"}})]})}),Object(y.jsxs)("div",{children:[Object(y.jsxs)(be.a,{className:O.formControl,children:[Object(y.jsx)(de.a,{htmlFor:"type-native-simple",children:"\u05e1\u05d5\u05d2 \u05d4\u05d0\u05d9\u05de\u05d5\u05df"}),Object(y.jsxs)(he.a,{native:!0,value:g.type,onChange:function(e){var t=e.target.name;v(Object(ee.a)({state:g},t,e.target.value))},inputProps:{name:"type",id:"type-native-simple"},children:[Object(y.jsx)("option",{"aria-label":"None",value:""}),Object(y.jsx)("option",{value:10,children:"\u05d0\u05d9\u05e9\u05d9"}),Object(y.jsx)("option",{value:20,children:"VIP"}),Object(y.jsx)("option",{value:30,children:"\u05de\u05ea\u05e0\u05d3\u05d1"}),Object(y.jsx)("option",{value:40,children:"\u05e7\u05d1\u05d5\u05e6\u05ea\u05d9"}),Object(y.jsx)("option",{value:50,children:"\u05de\u05d5\u05e1\u05d3"}),Object(y.jsx)("option",{value:60,children:"Online"})]})]}),Object(y.jsxs)(be.a,{className:w.formControl,children:[Object(y.jsx)(de.a,{id:"demo-mutiple-chip-label",children:"\u05e9\u05de\u05d5\u05ea \u05d4\u05de\u05ea\u05d0\u05de\u05e0\u05d9\u05dd"}),Object(y.jsx)(he.a,{labelId:"demo-mutiple-chip-label",id:"demo-mutiple-chip",multiple:!0,value:P,onChange:function(e){S(e.target.value)},input:Object(y.jsx)(ge.a,{id:"select-multiple-chip"}),renderValue:function(e){return Object(y.jsx)("div",{className:w.chips,children:e.map((function(e){return Object(y.jsx)(ye.a,{label:e,className:w.chip},e)}))})},MenuProps:_,children:["\u05e8\u05d5\u05ea\u05dd \u05d2\u05d1\u05d9\u05e9","\u05d2\u05dc \u05d2\u05d5\u05dc\u05d3\u05e9\u05d8\u05d9\u05d9\u05df","\u05d0\u05d5\u05e8\u05d9 \u05de\u05e8\u05d5\u05dd","\u05e2\u05d5\u05de\u05e8 \u05e6\u05d5\u05d5\u05d9\u05d2","\u05d3\u05d5\u05e8 \u05e9\u05d9\u05e8\u05df","\u05e8\u05d5\u05ea\u05dd \u05de\u05d0\u05d9\u05e8\u05e6\u05d5\u05e7","\u05d4\u05d2\u05e8 \u05d3\u05d4\u05df"].map((function(e){return Object(y.jsx)(ve.a,{value:e,style:T(e,P,k),children:e},e)}))})]})]}),Object(y.jsx)("form",{children:Object(y.jsx)(me.a,{rtl:t,children:Object(y.jsx)("div",{dir:"rtl",children:Object(y.jsx)(re.a,{id:"standard-textarea",label:"\u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05d4\u05d0\u05d9\u05de\u05d5\u05df",placeholder:"\u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05d4\u05d0\u05d9\u05de\u05d5\u05df",multiline:!0,fullWidth:!0})})})})]}),Object(y.jsxs)(ie.a,{children:[Object(y.jsx)(ne.a,{onClick:s,color:"primary",children:"\u05d1\u05d9\u05d8\u05d5\u05dc"}),Object(y.jsx)(ne.a,{onClick:s,color:"primary",children:"\u05d0\u05d9\u05e9\u05d5\u05e8"})]})]})]})})),Te=function(){return Object(y.jsxs)("div",{className:"trainer-content-controller",children:[Object(y.jsx)("div",{children:Object(y.jsx)(_e,{})}),Object(y.jsxs)(X.a,{variant:"pills",className:"flex-column",children:[Object(y.jsx)(X.a.Item,{children:Object(y.jsxs)(X.a.Link,{href:"/TrainerPage/exercise_schedule",children:["\u05dc\u05d5\u05d7 \u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd ",Object(y.jsx)(z.a,{})]})}),Object(y.jsx)(X.a.Item,{children:Object(y.jsxs)(X.a.Link,{href:"/TrainerPage/trainees",children:["\u05de\u05ea\u05d0\u05de\u05e0\u05d9\u05dd ",Object(y.jsx)(z.e,{})]})}),Object(y.jsx)(X.a.Item,{children:Object(y.jsxs)(X.a.Link,{href:"/TrainerPage/exercise_pictures",children:["\u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd ",Object(y.jsx)(z.b,{})]})}),Object(y.jsx)(X.a.Item,{children:Object(y.jsxs)(X.a.Link,{href:"/TrainerPage/exercise_history",children:["\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d9\u05ea \u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd ",Object(y.jsx)(z.c,{})]})}),Object(y.jsx)($,{})]})]})},we=n(65),ke=n.p+"static/media/EitanLogoSmall.bdbdd9e2.PNG",Ne=function(e){return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(v.a,{sm:9,children:Object(y.jsx)(we.a,{src:ke})}),Object(y.jsx)(v.a,{sm:3,children:Object(y.jsxs)("div",{className:"App",children:[Object(y.jsx)("img",{style:{margin:10},width:"50px",src:e.authenticationData.imageUrl,alt:e.alt}),Object(y.jsxs)("h5",{dir:"rtl",children:["\u05e9\u05dc\u05d5\u05dd, ",e.authenticationData.name]})]})})]})},Ce=Object(s.b)((function(e){return{authenticationData:e.authenticationData}}),{})((function(e){var t=Object(r.useState)(""),n=Object(f.a)(t,2),a=n[0],i=(n[1],Object(r.useState)("")),c=Object(f.a)(i,2);c[0],c[1];return console.log(e.authenticationData),Object(y.jsxs)("div",{className:"trainer-page",children:[Object(y.jsx)(g.a,{children:Object(y.jsx)(Ne,{authenticationData:e.authenticationData,alt:a})}),Object(y.jsxs)(g.a,{children:[Object(y.jsx)(v.a,{sm:9,children:Object(y.jsx)(J,{})}),Object(y.jsx)(v.a,{sm:3,children:Object(y.jsx)(Te,{})})]})]})})),Pe=n(42),Se=Object(s.b)((function(e){return{authenticationData:e.authenticationData}}),{})((function(e){var t=Object(r.useState)(""),n=Object(f.a)(t,2),a=n[0],i=(n[1],Object(r.useState)("")),c=Object(f.a)(i,2);c[0],c[1];return Object(y.jsxs)(Pe.a.Container,{id:"left-tabs-example",defaultActiveKey:"first",children:[Object(y.jsxs)(g.a,{children:[Object(y.jsx)(v.a,{sm:9,children:Object(y.jsx)(we.a,{src:ke})}),Object(y.jsx)(v.a,{sm:3,children:Object(y.jsxs)("div",{className:"App",children:[Object(y.jsx)("img",{style:{margin:10},width:"50px",src:e.authenticationData.imageURL,alt:a}),Object(y.jsxs)("h5",{dir:"rtl",children:["\u05e9\u05dc\u05d5\u05dd, ",e.authenticationData.name]})]})})]}),Object(y.jsxs)(g.a,{children:[Object(y.jsx)(v.a,{sm:9,children:Object(y.jsxs)(Pe.a.Content,{children:[Object(y.jsxs)(Pe.a.Pane,{eventKey:"first",children:[Object(y.jsx)("h1",{children:"\u05dc\u05d5\u05d7 \u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd"}),Object(y.jsx)(D,{})]}),Object(y.jsxs)(Pe.a.Pane,{eventKey:"second",children:[Object(y.jsx)("h1",{children:"\u05de\u05e2\u05e8\u05da \u05d4\u05e2\u05e6\u05de\u05d4"}),Object(y.jsx)("empowerment",{})]}),Object(y.jsxs)(Pe.a.Pane,{eventKey:"third",children:[Object(y.jsx)("h1",{children:"\u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd"}),Object(y.jsx)("photos",{})]}),Object(y.jsxs)(Pe.a.Pane,{eventKey:"fourth",children:[Object(y.jsx)("h1",{children:"\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d9\u05ea \u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd"}),Object(y.jsx)("history",{})]})]})}),Object(y.jsx)(v.a,{sm:3,children:Object(y.jsxs)(X.a,{variant:"pills",className:"flex-column",children:[Object(y.jsx)(X.a.Item,{children:Object(y.jsxs)(X.a.Link,{eventKey:"first",children:["\u05dc\u05d5\u05d7 \u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd  ",Object(y.jsx)(z.a,{})]})}),Object(y.jsx)(X.a.Item,{children:Object(y.jsxs)(X.a.Link,{eventKey:"second",children:["\u05de\u05e2\u05e8\u05da \u05d4\u05e2\u05e6\u05de\u05d4  ",Object(y.jsx)(z.e,{})]})}),Object(y.jsx)(X.a.Item,{children:Object(y.jsxs)(X.a.Link,{eventKey:"third",children:["\u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd  ",Object(y.jsx)(z.b,{})]})}),Object(y.jsx)(X.a.Item,{children:Object(y.jsxs)(X.a.Link,{eventKey:"fourth",children:["\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d9\u05ea \u05d0\u05d9\u05de\u05d5\u05e0\u05d9\u05dd  ",Object(y.jsx)(z.c,{})]})}),Object(y.jsx)($,{})]})})]})]})})),Ie=n.p+"static/media/EitanLogo.f0c3ca6e.PNG",De=n(228),Ae=function(e){return console.log("got response:"),console.log(e),e&&e.profileObj?{email:e.profileObj.email,familyName:e.profileObj.familyName,givenName:e.profileObj.givenName,googleId:e.profileObj.googleId,imageUrl:e.profileObj.imageUrl,name:e.profileObj.name}:{}},Ke=n(19),Ue=n.n(Ke),Le=n(33),Me={delayBy:function(){var e=Object(Le.a)(Ue.a.mark((function e(){var t,n=arguments;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:100,e.abrupt("return",new Promise((function(e){return setTimeout(e,t)})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),connect:function(){var e=Object(Le.a)(Ue.a.mark((function e(){return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/connect");case 3:return e.abrupt("return",!0);case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",!1);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}(),checkIfTrainer:function(){var e=Object(Le.a)(Ue.a.mark((function e(t){var n,r;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/checkIfTrainer/"+t);case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.result);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),checkIfTrainee:function(){var e=Object(Le.a)(Ue.a.mark((function e(t){var n,r;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/checkIfTrainee/"+t);case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.result);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getAllTrainees:function(){var e=Object(Le.a)(Ue.a.mark((function e(t){var n,r;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/getAllTrainees/"+t);case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.result);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),createNewTrain:function(){var e=Object(Le.a)(Ue.a.mark((function e(t,n,r,a,i,c){var s,o,l;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=n.trainees_or_group,e.next=3,fetch("/api/createNewTrain",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({trainer_id:t,trainees:{trainees_or_group:s},type:r,trainDate:a,trainTime:i,description:c})});case 3:return o=e.sent,e.next=6,o.json();case 6:return l=e.sent,e.abrupt("return",l);case 8:case"end":return e.stop()}}),e)})));return function(t,n,r,a,i,c){return e.apply(this,arguments)}}(),getPersonalProgram:function(){var e=Object(Le.a)(Ue.a.mark((function e(t){var n,r;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/getPersonalProgram/"+t);case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.result);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setPersonalProgram:function(){var e=Object(Le.a)(Ue.a.mark((function e(t,n,r){return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),getAllTrainingHistory_trainer:function(){var e=Object(Le.a)(Ue.a.mark((function e(t){var n,r;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/getAllTrainingHistory_trainer/"+t);case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.result);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getAllTrainingHistory_trainee:function(){var e=Object(Le.a)(Ue.a.mark((function e(t){var n,r;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/getAllTrainingHistory_trainee/"+t);case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.result);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),autoComplete_trainee:function(){var e=Object(Le.a)(Ue.a.mark((function e(t,n){var r,a;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/autoComplete_trainee/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({trainer_id:n,string:t})});case 2:return r=e.sent,e.next=5,r.json();case 5:return a=e.sent,e.abrupt("return",a.result);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),autoComplete_train_type:function(){var e=Object(Le.a)(Ue.a.mark((function e(t){var n,r;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/autoComplete_train_type/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({string:t})});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.result);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getAllTrain_type:function(){var e=Object(Le.a)(Ue.a.mark((function e(t){var n,r;return Ue.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/getAllTrain_type/"+t);case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r.result);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},Ee=function(e){console.log(e)},Fe={setUserData:j,setCurState:d},He=Object(s.b)((function(e){return{authenticationData:e.authenticationData,currentState:e.currentState}}),Fe)((function(e){var t=Object(r.useState)({}),n=Object(f.a)(t,2),a=n[0],i=n[1];return Object(r.useEffect)((function(){null===a.trainer_id&&(console.log("not a trainer. id not in system"),$())})),"trainer"===e.currentState?Object(y.jsx)(m.a,{to:"/TrainerPage"}):Object(y.jsx)("div",{children:Object(y.jsx)(q.a,{clientId:"476408447979-ksp3ikmql53717ucvohu0uhm8t7ld9f1.apps.googleusercontent.com",render:function(e){return Object(y.jsx)(De.a,{variant:"outline-primary",href:"/TrainerPage",size:"lg",onClick:e.onClick,disable:e.disabled,children:"\u05db\u05e0\u05d9\u05e1\u05ea \u05de\u05d0\u05de\u05e0\u05d9\u05dd"})},buttonText:"",onSuccess:function(t){var n=Ae(t);console.log("before check email"),Me.checkIfTrainer(n.email).then((function(e){i(e),console.log(e)})),e.setCurState("trainer"),e.setUserData(n)},onFailure:Ee,cookiePolicy:"single_host_origin"})})})),Ve=function(e){console.log(e)},Re={setUserData:j,setCurState:d},Ge=Object(s.b)((function(e){return{authenticationData:e.authenticationData,currentState:e.currentState}}),Re)((function(e){return"trainee"===e.currentState?Object(y.jsx)(m.a,{to:"/TrainingPage"}):Object(y.jsx)("div",{children:Object(y.jsx)(q.a,{clientId:"476408447979-ksp3ikmql53717ucvohu0uhm8t7ld9f1.apps.googleusercontent.com",render:function(e){return Object(y.jsx)(De.a,{variant:"outline-primary",href:"/TrainingPage",size:"lg",onClick:e.onClick,disable:e.disabled,children:"\u05db\u05e0\u05d9\u05e1\u05ea \u05de\u05ea\u05d0\u05de\u05e0\u05d9\u05dd"})},buttonText:"",onSuccess:function(t){console.log("got google login response"),console.log(t);var n=Ae(t);e.setCurState("trainee"),e.setUserData(n)},onFailure:Ve,cookiePolicy:"single_host_origin"})})}));var We=function(){return Object(y.jsxs)("div",{className:"App",children:[Object(y.jsx)("div",{className:"logo",style:{display:"flex",justifyContent:"center",alignItems:"center",margin:30,marginTop:100},children:Object(y.jsx)(we.a,{src:Ie,width:"240px"})}),Object(y.jsxs)("div",{className:"buttons",style:{display:"flex",justifyContent:"center",alignItems:"center"},children:[Object(y.jsx)("div",{className:"buttonTrainer",style:{display:"flex",justifyContent:"center",alignItems:"center",margin:10},children:Object(y.jsx)(He,{})}),Object(y.jsx)("div",{className:"buttonTraining",style:{display:"flex",justifyContent:"center",alignItems:"center",margin:10},children:Object(y.jsx)(Ge,{})})]})]})},Be=Object(y.jsx)(x.a,{children:Object(y.jsx)(s.a,{store:O,children:Object(y.jsx)("div",{children:Object(y.jsxs)(m.d,{children:[Object(y.jsx)(m.b,{exact:!0,path:"/",component:We}),Object(y.jsx)(m.b,{path:"/TrainingPage",component:Se}),Object(y.jsx)(m.b,{path:"/TrainerPage",component:Ce})]})})})});c.a.render(Be,document.getElementById("root"))}},[[180,1,2]]]);
//# sourceMappingURL=main.b80eb337.chunk.js.map