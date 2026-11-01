const KEY_USERS="taiKhoanAoDai",
KEY_CURRENT="nguoiDungDangNhap";
const $=id=>document.getElementById(id);


const form=$("userForm"),
rows=$("rows"),
message=$("message"),
search=$("search");


const userId=$("userId"),
fullName=$("fullName"),
username=$("username"),
email=$("email");


const password=$("password"),
role=$("role"),
formTitle=$("formTitle"),
saveButton=$("saveButton");


function readUsers(){
    try{
        return JSON.parse(localStorage.getItem(KEY_USERS))||[]
    }catch{
        return[]
    }
}
let users=readUsers();


function saveUsers(){
    localStorage.setItem(KEY_USERS,JSON.stringify(users))
}


function notice(text,type="success"){
    message.textContent=text;message.className=type
}


function render(){
 const key=search.value.trim().toLowerCase();
 const list=users.filter(u=>[u.hoTen,u.taiKhoan,u.email].some(v=>String(v||"").toLowerCase().includes(key)));
 rows.replaceChildren();
 if(!list.length){
    const tr=document.createElement("tr"),
    td=document.createElement("td");
    td.colSpan=6;td.className="empty";
    td.textContent=key?"Không tìm thấy người dùng.":"Chưa có người dùng.";
    tr.append(td);rows.append(tr);
    return
}
 list.forEach((u,i)=>{
    const tr=document.createElement("tr");
    [i+1,u.hoTen||"",u.taiKhoan||"",u.email||"",u.vaiTro||"Khách hàng"].forEach(v=>{
    const td=document.createElement("td");
    td.textContent=v;tr.append(td)});
    const actions=document.createElement("td");
    actions.className="actions";
    const edit=document.createElement("button");
    edit.type="button";
    edit.className="edit";
    edit.textContent="Sửa";
    edit.onclick=()=>editUser(u.id);
    const del=document.createElement("button");
    del.type="button";
    del.className="delete";
    del.textContent="Xóa";
    del.onclick=()=>deleteUser(u.id);
    actions.append(edit,del);
    tr.append(actions);
    rows.append(tr);
 });
}
form.addEventListener("submit",e=>{
    e.preventDefault();
    const id=userId.value,
    name=fullName.value.trim(),
    account=username.value.trim(),
    mail=email.value.trim().toLowerCase(),
    pass=password.value;
    if(!name||!account||!mail){
        notice("Vui lòng nhập đầy đủ thông tin.","error");
        return
    }
    if(users.some(u=>String(u.id)!==id&&((u.taiKhoan||"").toLowerCase()===account.toLowerCase()||(u.email||"").toLowerCase()===mail))){
        notice("Tên đăng nhập hoặc email đã tồn tại.","error");
        return
    }
    if((!id||pass)&&pass.length<6){
        notice("Mật khẩu phải có ít nhất 6 ký tự.","error");
        return
    }
    if(id){
        const i=users.findIndex(u=>String(u.id)===id);
        if(i<0){
            notice("Không tìm thấy tài khoản.","error");
            return
        }
        users[i]={
            ...users[i],
            hoTen:name,
            taiKhoan:account,
            email:mail,
            vaiTro:role.value
        };
        if(pass)users[i].matKhau=pass;
        const current=JSON.parse(localStorage.getItem(KEY_CURRENT)||"null");
        if(current&&String(current.id)===id)localStorage.setItem(KEY_CURRENT,JSON.stringify({
            id:users[i].id,
            hoTen:name,
            taiKhoan:account,
            email:mail,
            vaiTro:role.value
        }));
        notice("Cập nhật tài khoản thành công.");
        }else{
        users.push({
            id:Date.now(),
            hoTen:name,
            taiKhoan:account,
            email:mail,
            matKhau:pass,
            vaiTro:role.value
        });
        notice("Thêm tài khoản thành công.");
    }
    saveUsers();
    resetForm();
    render();
});
function editUser(id){
    const u=users.find(x=>String(x.id)===String(id));
    if(!u)return;
    userId.value=u.id;
    fullName.value=u.hoTen||"";
    username.value=u.taiKhoan||"";
    email.value=u.email||"";
    password.value="";
    role.value=u.vaiTro||"Khách hàng";
    formTitle.textContent="Sửa người dùng";
    saveButton.textContent="Lưu thay đổi";
    notice("Để trống mật khẩu nếu không muốn thay đổi.");
    window.scrollTo({top:0,behavior:"smooth"});
}
function deleteUser(id){
    const u=users.find(x=>String(x.id)===String(id));
    if(!u)return;
    if(!confirm(`Bạn có chắc muốn xóa tài khoản ${u.taiKhoan}?`))return;
    users=users.filter(x=>String(x.id)!==String(id));
    saveUsers();
    const current=JSON.parse(localStorage.getItem(KEY_CURRENT)||"null");
    if(current&&String(current.id)===String(id))localStorage.removeItem(KEY_CURRENT);
    if(userId.value===String(id))resetForm();
    render();
    notice("Đã xóa tài khoản.");
}
function resetForm(){
    form.reset();
    userId.value="";
    formTitle.textContent="Thêm người dùng";
    saveButton.textContent="Thêm tài khoản"
}
$("resetButton").addEventListener("click",()=>{
    resetForm();
    message.textContent="";
    message.className=""
});
search.addEventListener("input",render);
render();
