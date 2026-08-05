const { useState, useEffect, createContext, useContext } = React;

const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

const DB = {
  users: [
    { id: 1, name: "Pushpak Naidu",  email: "Pushpak@cms.edu",  password: "admin123", role: "Admin",    dept: "IT",          status: "Active",   joined: "2023-01-10", phone: "9876543210", avatar: "PN" },
    { id: 2, name: "Priya Nair",    email: "mgr@cms.edu",    password: "mgr123",   role: "Manager",  dept: "Operations",  status: "Active",   joined: "2023-03-15", phone: "9123456780", avatar: "PN" },
    { id: 3, name: "Ravi Kumar",    email: "emp@cms.edu",    password: "emp123",   role: "Employee", dept: "Finance",     status: "Active",   joined: "2023-06-01", phone: "9988776655", avatar: "RK" },
    { id: 4, name: "Sneha Patil",   email: "sneha@cms.edu",  password: "pass123",  role: "Employee", dept: "HR",          status: "Active",   joined: "2023-07-20", phone: "9876001122", avatar: "SP" },
    { id: 5, name: "Vikram Mehta",  email: "vikram@cms.edu", password: "pass123",  role: "Manager",  dept: "Engineering", status: "Inactive", joined: "2022-11-05", phone: "9001122334", avatar: "VM" },
    { id: 6, name: "Ananya Rao",    email: "ananya@cms.edu", password: "pass123",  role: "Employee", dept: "Marketing",   status: "Active",   joined: "2024-01-12", phone: "9556677889", avatar: "AR" },
    { id: 7, name: "Deepak Joshi",  email: "deepak@cms.edu", password: "pass123",  role: "Employee", dept: "IT",          status: "Active",   joined: "2024-02-18", phone: "9334455667", avatar: "DJ" },
    { id: 8, name: "Meena Iyer",    email: "meena@cms.edu",  password: "pass123",  role: "Manager",  dept: "Finance",     status: "Active",   joined: "2023-09-30", phone: "9712233445", avatar: "MI" },
  ],
  roles: [
    { id: 1, name: "Admin",    permissions: ["manage_users","manage_roles","view_reports","manage_settings","view_logs"], color: "#e74c3c" },
    { id: 2, name: "Manager",  permissions: ["view_users","view_reports","manage_team"], color: "#e67e22" },
    { id: 3, name: "Employee", permissions: ["view_profile","edit_profile"], color: "#27ae60" },
  ],
  logs: [
    { id: 1, user: "Arjun Sharma", action: "Created user Deepak Joshi",      time: "2024-02-18 10:23", type: "create" },
    { id: 2, user: "Arjun Sharma", action: "Updated role for Priya Nair",     time: "2024-02-17 14:05", type: "update" },
    { id: 3, user: "Priya Nair",   action: "Viewed Finance department report",time: "2024-02-17 09:10", type: "read"   },
    { id: 4, user: "Arjun Sharma", action: "Deactivated Vikram Mehta",        time: "2024-02-16 16:45", type: "update" },
    { id: 5, user: "Meena Iyer",   action: "Added Ananya Rao to Marketing",   time: "2024-01-12 11:00", type: "create" },
    { id: 6, user: "Arjun Sharma", action: "Deleted role 'Intern'",           time: "2024-01-10 13:22", type: "delete" },
  ],
  nextId: 9,
};

const S = {
  root: { minHeight:"100vh", background:"#0d1117", color:"#e6edf3", fontFamily:"'Segoe UI',sans-serif", display:"flex", flexDirection:"column" },
  loginWrap: { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0d1117 0%,#161b22 60%,#0d1117 100%)", position:"relative", overflow:"hidden" },
  loginCard: { background:"#161b22", border:"1px solid #30363d", borderRadius:16, padding:"48px 44px", width:400, position:"relative", zIndex:2, boxShadow:"0 24px 64px rgba(0,0,0,0.5)" },
  loginTitle: { fontSize:28, fontWeight:700, marginBottom:6, color:"#58a6ff", letterSpacing:-0.5 },
  loginSub: { fontSize:14, color:"#8b949e", marginBottom:32 },
  layout: { display:"flex", flex:1, minHeight:"100vh" },
  sidebar: { width:240, background:"#161b22", borderRight:"1px solid #30363d", display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, bottom:0, zIndex:100 },
  sidebarLogo: { padding:"20px 20px 16px", borderBottom:"1px solid #30363d", display:"flex", alignItems:"center", gap:10 },
  logoIcon: { width:36, height:36, borderRadius:8, background:"linear-gradient(135deg,#58a6ff,#1f6feb)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#fff" },
  logoText: { fontSize:15, fontWeight:700, color:"#e6edf3" },
  sidebarNav: { flex:1, padding:"12px 10px", overflowY:"auto" },
  navLabel: { fontSize:10, fontWeight:600, color:"#6e7681", letterSpacing:"0.1em", textTransform:"uppercase", padding:"8px 10px 4px" },
  navItem: (active) => ({ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:active?600:400, color:active?"#58a6ff":"#8b949e", background:active?"rgba(88,166,255,0.1)":"transparent", border:active?"1px solid rgba(88,166,255,0.2)":"1px solid transparent", marginBottom:2, transition:"all 0.15s" }),
  userPill: { margin:"12px 10px", padding:"10px 12px", background:"#0d1117", border:"1px solid #30363d", borderRadius:10, display:"flex", alignItems:"center", gap:10 },
  main: { marginLeft:240, flex:1, display:"flex", flexDirection:"column", minHeight:"100vh" },
  topbar: { background:"#161b22", borderBottom:"1px solid #30363d", padding:"0 28px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50 },
  pageTitle: { fontSize:18, fontWeight:700, color:"#e6edf3" },
  content: { padding:28, flex:1 },
  card: { background:"#161b22", border:"1px solid #30363d", borderRadius:12, padding:24, marginBottom:20 },
  statCard: (accent) => ({ background:"#161b22", border:`1px solid ${accent}33`, borderRadius:12, padding:"20px 22px", flex:1, position:"relative", overflow:"hidden" }),
  statGrid: { display:"flex", gap:16, marginBottom:24 },
  table: { width:"100%", borderCollapse:"collapse" },
  th: { textAlign:"left", padding:"10px 14px", fontSize:12, fontWeight:600, color:"#6e7681", letterSpacing:"0.05em", textTransform:"uppercase", borderBottom:"1px solid #30363d" },
  td: { padding:"12px 14px", borderBottom:"1px solid #21262d", fontSize:14, verticalAlign:"middle" },
  formRow: { marginBottom:18 },
  label: { display:"block", fontSize:13, fontWeight:500, color:"#8b949e", marginBottom:6 },
  input: { width:"100%", padding:"9px 12px", background:"#0d1117", border:"1px solid #30363d", borderRadius:8, color:"#e6edf3", fontSize:14, outline:"none", boxSizing:"border-box" },
  select: { width:"100%", padding:"9px 12px", background:"#0d1117", border:"1px solid #30363d", borderRadius:8, color:"#e6edf3", fontSize:14, outline:"none", boxSizing:"border-box" },
  btn: (variant="primary") => {
    const map = { primary:{background:"#238636",border:"1px solid #2ea043",color:"#fff"}, blue:{background:"#1f6feb",border:"1px solid #388bfd",color:"#fff"}, danger:{background:"#da3633",border:"1px solid #f85149",color:"#fff"}, ghost:{background:"transparent",border:"1px solid #30363d",color:"#e6edf3"}, warning:{background:"#9e6a03",border:"1px solid #d29922",color:"#fff"} };
    return { ...map[variant], padding:"8px 16px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500 };
  },
  badge: (color) => ({ display:"inline-block", padding:"3px 10px", borderRadius:20, fontSize:12, fontWeight:600, background:color+"22", color:color, border:`1px solid ${color}44` }),
  avatar: (color="#58a6ff") => ({ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${color},${color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }),
  modal: { position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 },
  modalCard: { background:"#161b22", border:"1px solid #30363d", borderRadius:14, padding:32, width:480, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 64px rgba(0,0,0,0.6)" },
  chip: (c) => ({ display:"inline-block", padding:"2px 8px", borderRadius:4, fontSize:11, fontWeight:500, background:c+"22", color:c, border:`1px solid ${c}33`, marginRight:4, marginBottom:4 }),
};

const ROLE_COLORS = { Admin:"#e74c3c", Manager:"#e67e22", Employee:"#27ae60" };
const STATUS_COLORS = { Active:"#3fb950", Inactive:"#f85149" };
const LOG_COLORS = { create:"#3fb950", update:"#d29922", delete:"#f85149", read:"#58a6ff" };
const DEPTS = ["IT","Operations","Finance","HR","Engineering","Marketing","Legal","Design"];

const avatarColor = (name) => {
  const colors = ["#58a6ff","#3fb950","#e67e22","#e74c3c","#a371f7","#f0883e","#39d353","#79c0ff"];
  return colors[name.charCodeAt(0) % colors.length];
};

const getInitials = (name) =>
  (name || "").split(" ").filter(Boolean).map(w => w[0]).join("").slice(0,2).toUpperCase();

const Toast = ({ msg, onClose }) =>
  msg ? (
    <div style={{ position:"fixed", bottom:24, right:24, background:"#1f2937", border:"1px solid #30363d", color:"#e6edf3", padding:"12px 20px", borderRadius:10, fontSize:14, zIndex:9999, boxShadow:"0 8px 24px rgba(0,0,0,0.4)", display:"flex", alignItems:"center", gap:10 }}>
      <span>✓</span> {msg}
      <span style={{ cursor:"pointer", marginLeft:8, color:"#8b949e" }} onClick={onClose}>×</span>
    </div>
  ) : null;

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("Pushpak@cms.edu");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const demos = [
    { label:"Admin",    email:"Pushpak@cms.edu", pw:"admin123", color:"#e74c3c" },
    { label:"Manager",  email:"mgr@cms.edu",   pw:"mgr123",   color:"#e67e22" },
    { label:"Employee", email:"emp@cms.edu",   pw:"emp123",   color:"#27ae60" },
  ];

  const handleLogin = () => {
    setLoading(true); setErr("");
    setTimeout(() => {
      const user = DB.users.find(u => u.email === email && u.password === password);
      if (user) { onLogin(user); } else { setErr("Invalid email or password."); }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={S.loginWrap}>
      <div style={{ position:"absolute", top:-100, left:-100, width:400, height:400, borderRadius:"50%", background:"rgba(88,166,255,0.04)", zIndex:1 }} />
      <div style={{ position:"absolute", bottom:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(63,185,80,0.04)", zIndex:1 }} />
      <div style={S.loginCard}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
          <div style={S.logoIcon}>U</div>
          <div>
            <div style={S.loginTitle}>UserMS</div>
            <div style={S.loginSub}>Multi-role User Management System</div>
          </div>
        </div>
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:12, color:"#6e7681", marginBottom:10, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>Quick Login</div>
          <div style={{ display:"flex", gap:8 }}>
            {demos.map(d => (
              <button key={d.label} style={{ ...S.btn("ghost"), flex:1, fontSize:12, borderColor:d.color+"44", color:d.color }} onClick={() => { setEmail(d.email); setPassword(d.pw); }}>{d.label}</button>
            ))}
          </div>
        </div>
        <div style={S.formRow}>
          <label style={S.label}>Email Address</label>
          <input style={S.input} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@cms.edu" onKeyDown={e => e.key==="Enter"&&handleLogin()} />
        </div>
        <div style={S.formRow}>
          <label style={S.label}>Password</label>
          <input style={S.input} type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key==="Enter"&&handleLogin()} />
        </div>
        {err && <div style={{ color:"#f85149", fontSize:13, marginBottom:14 }}>{err}</div>}
        <button style={{ ...S.btn("blue"), width:"100%", padding:"11px", fontSize:15 }} onClick={handleLogin}>
          {loading ? "Signing in…" : "Sign In →"}
        </button>
        <div style={{ marginTop:20, padding:"14px", background:"#0d1117", borderRadius:8, border:"1px solid #21262d" }}>
          <div style={{ fontSize:11, color:"#6e7681", marginBottom:6, fontWeight:600 }}>MySQL Table: users</div>
          <div style={{ fontSize:11, color:"#8b949e", fontFamily:"monospace" }}>SELECT * FROM users WHERE email=? AND password=?</div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, user }) {
  const isAdmin = user.role === "Admin";
  const isMgrPlus = isAdmin || user.role === "Manager";
  const nav = [
    { icon:"⊞", label:"Dashboard",       key:"dashboard", show:true },
    { icon:"👥", label:"User Management", key:"users",     show:isAdmin },
    { icon:"🛡", label:"Role Management", key:"roles",     show:isAdmin },
    { icon:"📊", label:"Reports",         key:"reports",   show:isMgrPlus },
    { icon:"📋", label:"Activity Logs",   key:"logs",      show:isAdmin },
    { icon:"⚙",  label:"My Profile",      key:"profile",   show:true },
  ].filter(n => n.show);

  return (
    <div style={S.sidebar}>
      <div style={S.sidebarLogo}>
        <div style={S.logoIcon}>U</div>
        <div>
          <div style={S.logoText}>UserMS</div>
          <div style={{ fontSize:10, color:"#6e7681" }}>v1.0 · ReactJS</div>
        </div>
      </div>
      <div style={S.sidebarNav}>
        <div style={S.navLabel}>Navigation</div>
        {nav.map(n => (
          <div key={n.key} style={S.navItem(page===n.key)} onClick={() => setPage(n.key)}>
            <span style={{ fontSize:15 }}>{n.icon}</span>
            <span>{n.label}</span>
          </div>
        ))}
      </div>
      <div style={S.userPill}>
        <div style={S.avatar(avatarColor(user.name))}>{getInitials(user.name)}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:600, color:"#e6edf3", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user.name}</div>
          <div style={{ fontSize:11, color:ROLE_COLORS[user.role] }}>{user.role}</div>
        </div>
      </div>
    </div>
  );
}

function Topbar({ page, user, onLogout }) {
  const titles = { dashboard:"Dashboard", users:"User Management", roles:"Role Management", reports:"Reports", logs:"Activity Logs", profile:"My Profile" };
  return (
    <div style={S.topbar}>
      <div style={S.pageTitle}>{titles[page] || page}</div>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <span style={S.badge(ROLE_COLORS[user.role])}>{user.role}</span>
        <button style={S.btn("ghost")} onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  );
}

function Dashboard({ users, user }) {
  const stats = [
    { label:"Total Users",  value:users.length,                                       accent:"#58a6ff", icon:"👥" },
    { label:"Active Users", value:users.filter(u=>u.status==="Active").length,        accent:"#3fb950", icon:"✓" },
    { label:"Admins",       value:users.filter(u=>u.role==="Admin").length,           accent:"#e74c3c", icon:"🛡" },
    { label:"Managers",     value:users.filter(u=>u.role==="Manager").length,         accent:"#e67e22", icon:"⚡" },
  ];
  const deptData = DEPTS.map(d => ({ dept:d, count:users.filter(u=>u.dept===d).length })).filter(x=>x.count>0);
  const roleData = ["Admin","Manager","Employee"].map(r => ({ role:r, count:users.filter(u=>u.role===r).length }));
  const recentUsers = [...users].sort((a,b) => new Date(b.joined)-new Date(a.joined)).slice(0,5);
  const maxDept = Math.max(...deptData.map(d=>d.count));

  return (
    <div style={S.content}>
      <div style={{ ...S.card, background:"linear-gradient(135deg,#1f2937 0%,#161b22 100%)", borderColor:"#58a6ff33", marginBottom:20 }}>
        <div style={{ fontSize:20, fontWeight:700, color:"#e6edf3", marginBottom:4 }}>Welcome back, {user.name.split(" ")[0]} 👋</div>
        <div style={{ color:"#8b949e", fontSize:14 }}>Logged in as <span style={{ color:ROLE_COLORS[user.role] }}>{user.role}</span> · {user.dept} Department</div>
      </div>
      <div style={S.statGrid}>
        {stats.map(s => (
          <div key={s.label} style={S.statCard(s.accent)}>
            <div style={{ fontSize:28, fontWeight:800, color:s.accent }}>{s.value}</div>
            <div style={{ fontSize:13, color:"#8b949e", marginTop:4 }}>{s.label}</div>
            <div style={{ position:"absolute", top:16, right:16, fontSize:20, opacity:0.3 }}>{s.icon}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        <div style={S.card}>
          <div style={{ fontSize:14, fontWeight:600, color:"#e6edf3", marginBottom:18 }}>Users by Department</div>
          {deptData.map(d => (
            <div key={d.dept} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#8b949e", marginBottom:4 }}>
                <span>{d.dept}</span><span style={{ color:"#e6edf3", fontWeight:600 }}>{d.count}</span>
              </div>
              <div style={{ height:6, background:"#21262d", borderRadius:3 }}>
                <div style={{ height:"100%", width:`${(d.count/maxDept)*100}%`, background:"linear-gradient(90deg,#1f6feb,#58a6ff)", borderRadius:3 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={S.card}>
          <div style={{ fontSize:14, fontWeight:600, color:"#e6edf3", marginBottom:18 }}>Role Distribution</div>
          {roleData.map(r => (
            <div key={r.role} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #21262d" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:ROLE_COLORS[r.role] }} />
                <span style={{ fontSize:14 }}>{r.role}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:80, height:6, background:"#21262d", borderRadius:3 }}>
                  <div style={{ height:"100%", width:`${(r.count/users.length)*100}%`, background:ROLE_COLORS[r.role], borderRadius:3 }} />
                </div>
                <span style={{ fontSize:13, color:"#8b949e", width:20, textAlign:"right" }}>{r.count}</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop:16, padding:"10px 12px", background:"#0d1117", borderRadius:8, border:"1px solid #21262d" }}>
            <div style={{ fontSize:10, color:"#6e7681", marginBottom:4, fontWeight:600 }}>MySQL Query</div>
            <div style={{ fontSize:10, color:"#8b949e", fontFamily:"monospace" }}>SELECT role, COUNT(*) FROM users GROUP BY role;</div>
          </div>
        </div>
      </div>
      <div style={S.card}>
        <div style={{ fontSize:14, fontWeight:600, color:"#e6edf3", marginBottom:16 }}>Recently Joined Users</div>
        <table style={S.table}>
          <thead><tr>{["Name","Role","Department","Joined","Status"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {recentUsers.map(u => (
              <tr key={u.id}>
                <td style={S.td}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={S.avatar(avatarColor(u.name))}>{getInitials(u.name)}</div>
                    <div><div style={{ fontWeight:500 }}>{u.name}</div><div style={{ fontSize:12, color:"#8b949e" }}>{u.email}</div></div>
                  </div>
                </td>
                <td style={S.td}><span style={S.badge(ROLE_COLORS[u.role])}>{u.role}</span></td>
                <td style={S.td}><span style={{ color:"#8b949e" }}>{u.dept}</span></td>
                <td style={S.td}><span style={{ color:"#8b949e", fontSize:12 }}>{u.joined}</span></td>
                <td style={S.td}><span style={S.badge(STATUS_COLORS[u.status])}>{u.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserManagement({ users, setUsers, toast }) {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"Employee", dept:"IT", phone:"", status:"Active" });

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (u.name.toLowerCase().includes(q)||u.email.toLowerCase().includes(q)||u.dept.toLowerCase().includes(q)) &&
      (filterRole==="All"||u.role===filterRole) && (filterStatus==="All"||u.status===filterStatus);
  });

  const openAdd = () => { setForm({ name:"", email:"", password:"", role:"Employee", dept:"IT", phone:"", status:"Active" }); setModal("add"); };
  const openEdit = (u) => { setSelected(u); setForm({...u}); setModal("edit"); };
  const openView = (u) => { setSelected(u); setModal("view"); };
  const openDelete = (u) => { setSelected(u); setModal("delete"); };

  const handleAdd = () => {
    if(!form.name||!form.email) return;
    const newUser = { ...form, id:DB.nextId++, avatar:form.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(), joined:new Date().toISOString().slice(0,10) };
    setUsers(p=>[...p,newUser]);
    toast(`User "${form.name}" created.`); setModal(null);
  };
  const handleEdit = () => {
    setUsers(p=>p.map(u=>u.id===selected.id?{...u,...form}:u));
    toast(`User "${form.name}" updated.`); setModal(null);
  };
  const handleDelete = () => {
    setUsers(p=>p.filter(u=>u.id!==selected.id));
    toast(`User "${selected.name}" deleted.`); setModal(null);
  };
  const toggleStatus = (u) => {
    setUsers(p=>p.map(x=>x.id===u.id?{...x,status:x.status==="Active"?"Inactive":"Active"}:x));
    toast(`${u.name} status toggled.`);
  };

  const FormFields = () => (
    <>
      {[["Full Name","name","text"],["Email","email","email"],["Phone","phone","text"],["Password","password","password"]].map(([l,k,t])=>(
        <div key={k} style={S.formRow}>
          <label style={S.label}>{l}</label>
          <input style={S.input} type={t} value={form[k]||""} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} />
        </div>
      ))}
      {[["Role","role",["Admin","Manager","Employee"]],["Department","dept",DEPTS],["Status","status",["Active","Inactive"]]].map(([l,k,opts])=>(
        <div key={k} style={S.formRow}>
          <label style={S.label}>{l}</label>
          <select style={S.select} value={form[k]||""} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}>
            {opts.map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
      ))}
    </>
  );

  return (
    <div style={S.content}>
      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
        <input style={{ ...S.input, width:240, flex:"none" }} placeholder="Search users…" value={search} onChange={e=>setSearch(e.target.value)} />
        <select style={{ ...S.select, width:130 }} value={filterRole} onChange={e=>setFilterRole(e.target.value)}>
          {["All","Admin","Manager","Employee"].map(r=><option key={r}>{r}</option>)}
        </select>
        <select style={{ ...S.select, width:130 }} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
          {["All","Active","Inactive"].map(s=><option key={s}>{s}</option>)}
        </select>
        <div style={{ marginLeft:"auto" }}>
          <button style={S.btn("primary")} onClick={openAdd}>+ Add User</button>
        </div>
      </div>
      <div style={S.card}>
        <div style={{ fontSize:13, color:"#8b949e", marginBottom:14 }}>{filtered.length} user(s) found</div>
        <table style={S.table}>
          <thead><tr>{["User","Role","Department","Status","Joined","Actions"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(u=>(
              <tr key={u.id}>
                <td style={S.td}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={S.avatar(avatarColor(u.name))}>{getInitials(u.name)}</div>
                    <div><div style={{ fontWeight:500 }}>{u.name}</div><div style={{ fontSize:12, color:"#8b949e" }}>{u.email}</div></div>
                  </div>
                </td>
                <td style={S.td}><span style={S.badge(ROLE_COLORS[u.role])}>{u.role}</span></td>
                <td style={S.td}><span style={{ color:"#8b949e" }}>{u.dept}</span></td>
                <td style={S.td}><span style={S.badge(STATUS_COLORS[u.status])}>{u.status}</span></td>
                <td style={S.td}><span style={{ color:"#8b949e", fontSize:12 }}>{u.joined}</span></td>
                <td style={S.td}>
                  <div style={{ display:"flex", gap:6 }}>
                    <button style={{ ...S.btn("ghost"), fontSize:11, padding:"4px 8px" }} onClick={()=>openView(u)}>View</button>
                    <button style={{ ...S.btn("blue"), fontSize:11, padding:"4px 8px" }} onClick={()=>openEdit(u)}>Edit</button>
                    <button style={{ ...S.btn(u.status==="Active"?"warning":"primary"), fontSize:11, padding:"4px 8px" }} onClick={()=>toggleStatus(u)}>
                      {u.status==="Active"?"Deactivate":"Activate"}
                    </button>
                    <button style={{ ...S.btn("danger"), fontSize:11, padding:"4px 8px" }} onClick={()=>openDelete(u)}>Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(modal==="add"||modal==="edit") && (
        <div style={S.modal} onClick={()=>setModal(null)}>
          <div style={S.modalCard} onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>{modal==="add"?"Add New User":"Edit User"}</div>
            <FormFields />
            <div style={{ padding:"10px 12px", background:"#0d1117", borderRadius:8, border:"1px solid #21262d", marginBottom:16 }}>
              <div style={{ fontSize:10, color:"#6e7681", marginBottom:4 }}>MySQL</div>
              <div style={{ fontSize:10, color:"#8b949e", fontFamily:"monospace" }}>
                {modal==="add" ? `INSERT INTO users (name, email, role, dept) VALUES ('${form.name}','${form.email}','${form.role}','${form.dept}');` : `UPDATE users SET name='${form.name}', role='${form.role}' WHERE id=${selected?.id};`}
              </div>
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button style={S.btn("ghost")} onClick={()=>setModal(null)}>Cancel</button>
              <button style={S.btn("primary")} onClick={modal==="add"?handleAdd:handleEdit}>{modal==="add"?"Create User":"Save Changes"}</button>
            </div>
          </div>
        </div>
      )}

      {modal==="view" && selected && (
        <div style={S.modal} onClick={()=>setModal(null)}>
          <div style={S.modalCard} onClick={e=>e.stopPropagation()}>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ ...S.avatar(avatarColor(selected.name)), width:60, height:60, fontSize:22, margin:"0 auto 12px" }}>{getInitials(selected.name)}</div>
              <div style={{ fontSize:20, fontWeight:700 }}>{selected.name}</div>
              <div style={{ color:"#8b949e", fontSize:13 }}>{selected.email}</div>
              <div style={{ marginTop:8 }}>
                <span style={S.badge(ROLE_COLORS[selected.role])}>{selected.role}</span>{" "}
                <span style={S.badge(STATUS_COLORS[selected.status])}>{selected.status}</span>
              </div>
            </div>
            {[ ["Department",selected.dept],["Phone",selected.phone],["Joined",selected.joined],["User ID","#"+selected.id] ].map(([l,v])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #21262d" }}>
                <span style={{ color:"#8b949e", fontSize:13 }}>{l}</span>
                <span style={{ fontSize:13, fontWeight:500 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop:16, padding:"10px 12px", background:"#0d1117", borderRadius:8, border:"1px solid #21262d" }}>
              <div style={{ fontSize:10, color:"#6e7681", marginBottom:4 }}>MySQL Query</div>
              <div style={{ fontSize:10, color:"#8b949e", fontFamily:"monospace" }}>SELECT * FROM users WHERE id={selected.id};</div>
            </div>
            <button style={{ ...S.btn("ghost"), width:"100%", marginTop:16 }} onClick={()=>setModal(null)}>Close</button>
          </div>
        </div>
      )}

      {modal==="delete" && selected && (
        <div style={S.modal} onClick={()=>setModal(null)}>
          <div style={{ ...S.modalCard, width:380 }} onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:18, fontWeight:700, color:"#f85149", marginBottom:12 }}>Delete User</div>
            <p style={{ color:"#8b949e", fontSize:14, marginBottom:20 }}>Are you sure you want to delete <strong style={{ color:"#e6edf3" }}>{selected.name}</strong>? This cannot be undone.</p>
            <div style={{ padding:"10px 12px", background:"#0d1117", borderRadius:8, border:"1px solid #21262d", marginBottom:20 }}>
              <div style={{ fontSize:10, color:"#6e7681", marginBottom:4 }}>MySQL Query</div>
              <div style={{ fontSize:10, color:"#f85149", fontFamily:"monospace" }}>DELETE FROM users WHERE id={selected.id};</div>
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button style={S.btn("ghost")} onClick={()=>setModal(null)}>Cancel</button>
              <button style={S.btn("danger")} onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RoleManagement({ toast }) {
  const [roles, setRoles] = useState(DB.roles);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name:"", permissions:[], color:"#58a6ff" });
  const [selected, setSelected] = useState(null);
  const ALL_PERMS = ["manage_users","manage_roles","view_reports","manage_settings","view_logs","view_users","manage_team","view_profile","edit_profile"];

  const togglePerm = (p) => setForm(f => ({ ...f, permissions: f.permissions.includes(p) ? f.permissions.filter(x=>x!==p) : [...f.permissions,p] }));
  const handleSave = () => {
    if(!form.name) return;
    if(modal==="add") { setRoles(p=>[...p,{id:Date.now(),...form}]); toast(`Role "${form.name}" created.`); }
    else { setRoles(p=>p.map(r=>r.id===selected.id?{...r,...form}:r)); toast(`Role "${form.name}" updated.`); }
    setModal(null);
  };
  const handleDelete = (r) => { setRoles(p=>p.filter(x=>x.id!==r.id)); toast(`Role "${r.name}" deleted.`); };

  return (
    <div style={S.content}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ color:"#8b949e", fontSize:14 }}>Manage system roles and their permissions.</div>
        <button style={S.btn("primary")} onClick={()=>{ setForm({name:"",permissions:[],color:"#58a6ff"}); setModal("add"); }}>+ New Role</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 }}>
        {roles.map(r=>(
          <div key={r.id} style={{ ...S.card, borderColor:r.color+"44", position:"relative" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:42, height:42, borderRadius:10, background:r.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, border:`1px solid ${r.color}44` }}>🛡</div>
              <div>
                <div style={{ fontWeight:700, fontSize:16 }}>{r.name}</div>
                <div style={{ fontSize:12, color:"#8b949e" }}>{r.permissions.length} permission(s)</div>
              </div>
            </div>
            <div style={{ marginBottom:16 }}>{r.permissions.map(p=><span key={p} style={S.chip(r.color)}>{p}</span>)}</div>
            <div style={{ display:"flex", gap:8 }}>
              <button style={{ ...S.btn("blue"), fontSize:12, padding:"5px 12px" }} onClick={()=>{ setSelected(r); setForm({name:r.name,permissions:[...r.permissions],color:r.color}); setModal("edit"); }}>Edit</button>
              {r.name!=="Admin" && <button style={{ ...S.btn("danger"), fontSize:12, padding:"5px 12px" }} onClick={()=>handleDelete(r)}>Delete</button>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...S.card, marginTop:20 }}>
        <div style={{ fontSize:12, color:"#6e7681", marginBottom:8, fontWeight:600 }}>MySQL Schema — roles & role_permissions tables</div>
        <div style={{ fontSize:12, color:"#8b949e", fontFamily:"monospace", lineHeight:1.8 }}>
          CREATE TABLE roles (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50) UNIQUE, color VARCHAR(10));<br/>
          CREATE TABLE role_permissions (role_id INT, permission VARCHAR(50), FOREIGN KEY (role_id) REFERENCES roles(id));
        </div>
      </div>
      {modal && (
        <div style={S.modal} onClick={()=>setModal(null)}>
          <div style={S.modalCard} onClick={e=>e.stopPropagation()}>
            <div style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>{modal==="add"?"Create Role":"Edit Role"}</div>
            <div style={S.formRow}>
              <label style={S.label}>Role Name</label>
              <input style={S.input} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div style={S.formRow}>
              <label style={S.label}>Accent Color</label>
              <input style={{ ...S.input, width:80 }} type="color" value={form.color} onChange={e=>setForm(f=>({...f,color:e.target.value}))} />
            </div>
            <div style={S.formRow}>
              <label style={S.label}>Permissions</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:4 }}>
                {ALL_PERMS.map(p=>(
                  <div key={p} style={{ padding:"5px 12px", borderRadius:6, cursor:"pointer", fontSize:12, fontWeight:500, background:form.permissions.includes(p)?form.color+"33":"#21262d", border:`1px solid ${form.permissions.includes(p)?form.color:"#30363d"}`, color:form.permissions.includes(p)?form.color:"#8b949e" }} onClick={()=>togglePerm(p)}>{p}</div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
              <button style={S.btn("ghost")} onClick={()=>setModal(null)}>Cancel</button>
              <button style={S.btn("primary")} onClick={handleSave}>Save Role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Reports({ users }) {
  const byRole = ["Admin","Manager","Employee"].map(r=>({ r, count:users.filter(u=>u.role===r).length }));
  const byDept = DEPTS.map(d=>({ d, active:users.filter(u=>u.dept===d&&u.status==="Active").length, inactive:users.filter(u=>u.dept===d&&u.status==="Inactive").length })).filter(x=>x.active+x.inactive>0);
  const maxTotal = Math.max(...byDept.map(x=>x.active+x.inactive));
  const queries = [
    ["Total users by role","SELECT role, COUNT(*) AS total FROM users GROUP BY role;"],
    ["Active vs Inactive","SELECT status, COUNT(*) AS total FROM users GROUP BY status;"],
    ["Users by department","SELECT dept, COUNT(*) AS total FROM users GROUP BY dept ORDER BY total DESC;"],
    ["Admins list","SELECT name, email, joined FROM users WHERE role='Admin';"],
  ];
  return (
    <div style={S.content}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        <div style={S.card}>
          <div style={{ fontSize:14, fontWeight:600, marginBottom:16, color:"#e6edf3" }}>Users by Role</div>
          {byRole.map(({r,count})=>(
            <div key={r} style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:ROLE_COLORS[r], flexShrink:0 }} />
              <div style={{ width:80, fontSize:13 }}>{r}</div>
              <div style={{ flex:1, height:8, background:"#21262d", borderRadius:4 }}>
                <div style={{ height:"100%", width:`${(count/users.length)*100}%`, background:ROLE_COLORS[r], borderRadius:4 }} />
              </div>
              <div style={{ fontSize:13, fontWeight:600, color:ROLE_COLORS[r], width:24, textAlign:"right" }}>{count}</div>
            </div>
          ))}
        </div>
        <div style={S.card}>
          <div style={{ fontSize:14, fontWeight:600, marginBottom:16, color:"#e6edf3" }}>Active vs Inactive</div>
          { ["Active","Inactive"].map(s=>{
            const c=users.filter(u=>u.status===s).length;
            return (
              <div key={s} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:6 }}>
                  <span style={{ color:"#8b949e" }}>{s}</span>
                  <span style={{ color:STATUS_COLORS[s], fontWeight:700 }}>{c} ({Math.round(c/users.length*100)}%)</span>
                </div>
                <div style={{ height:12, background:"#21262d", borderRadius:6 }}>
                  <div style={{ height:"100%", width:`${(c/users.length)*100}%`, background:STATUS_COLORS[s], borderRadius:6 }} />
                </div>
              </div>
            );
          }) }
          <div style={{ marginTop:8, padding:"12px", background:"#0d1117", borderRadius:8, border:"1px solid #21262d" }}>
            <div style={{ fontSize:11, color:"#6e7681", marginBottom:4 }}>MySQL</div>
            <div style={{ fontSize:11, color:"#8b949e", fontFamily:"monospace" }}>SELECT status, COUNT(*) FROM users GROUP BY status;</div>
          </div>
        </div>
      </div>
      <div style={{ ...S.card, marginBottom:20 }}>
        <div style={{ fontSize:14, fontWeight:600, marginBottom:16, color:"#e6edf3" }}>Department Breakdown</div>
        <table style={S.table}>
          <thead><tr>{["Department","Active","Inactive","Total","Distribution"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {byDept.map(x=>(
              <tr key={x.d}>
                <td style={S.td}><strong>{x.d}</strong></td>
                <td style={S.td}><span style={S.badge("#3fb950")}>{x.active}</span></td>
                <td style={S.td}><span style={S.badge("#f85149")}>{x.inactive}</span></td>
                <td style={S.td}><strong>{x.active+x.inactive}</strong></td>
                <td style={{ ...S.td, minWidth:160 }}>
                  <div style={{ height:6, background:"#21262d", borderRadius:3 }}>
                    <div style={{ height:"100%", width:`${((x.active+x.inactive)/maxTotal)*100}%`, background:"linear-gradient(90deg,#1f6feb,#58a6ff)", borderRadius:3 }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={S.card}>
        <div style={{ fontSize:14, fontWeight:14, marginBottom:14, color:"#e6edf3" }}>MySQL Report Queries Reference</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {queries.map(([label,sql])=>(
            <div key={label} style={{ padding:"12px", background:"#0d1117", borderRadius:8, border:"1px solid #21262d" }}>
              <div style={{ fontSize:11, color:"#58a6ff", marginBottom:6, fontWeight:600 }}>{label}</div>
              <div style={{ fontSize:11, color:"#8b949e", fontFamily:"monospace", lineHeight:1.7 }}>{sql}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityLogs({ users }) {
  const [logs] = useState([...DB.logs]);
  const [filter, setFilter] = useState("All");
  const types = ["All","create","update","delete","read"];
  const filtered = filter==="All" ? logs : logs.filter(l=>l.type===filter);
  return (
    <div style={S.content}>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {types.map(t=>(
          <button key={t} style={{ ...S.btn(filter===t?"blue":"ghost"), fontSize:12, textTransform:"capitalize", ...(filter===t&&t!=="All"?{background:LOG_COLORS[t]+"22",color:LOG_COLORS[t],borderColor:LOG_COLORS[t]+"44"}:{}) }} onClick={()=>setFilter(t)}>
            {t==="All"?"All Logs":t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>
      <div style={S.card}>
        <div style={{ fontSize:13, color:"#8b949e", marginBottom:14 }}>{filtered.length} log entries</div>
        <table style={S.table}>
          <thead><tr>{["#","User","Action","Type","Timestamp"].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((l,i)=>(
              <tr key={l.id}>
                <td style={{ ...S.td, color:"#6e7681", fontSize:12 }}>{i+1}</td>
                <td style={S.td}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ ...S.avatar(avatarColor(l.user)), width:28, height:28, fontSize:11 }}>{l.user.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                    <span style={{ fontWeight:500 }}>{l.user}</span>
                  </div>
                </td>
                <td style={S.td}>{l.action}</td>
                <td style={S.td}><span style={S.badge(LOG_COLORS[l.type])}>{l.type}</span></td>
                <td style={{ ...S.td, fontSize:12, color:"#8b949e", fontFamily:"monospace" }}>{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={S.card}>
        <div style={{ fontSize:12, color:"#6e7681", marginBottom:8, fontWeight:600 }}>MySQL — audit_logs table</div>
        <div style={{ fontSize:12, color:"#8b949e", fontFamily:"monospace", lineHeight:1.8 }}>
          CREATE TABLE audit_logs (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, action VARCHAR(255), action_type ENUM('create','read','update','delete'), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id));<br/>
          SELECT * FROM audit_logs ORDER BY created_at DESC;
        </div>
      </div>
    </div>
  );
}

function MyProfile({ user, setUser, toast }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({...user});
  const rolePerms = DB.roles.find(r=>r.name===user.role)?.permissions || [];
  const handleSave = () => { setUser(prev=>({...prev,...form})); setEditMode(false); toast("Profile updated successfully."); };
  return (
    <div style={S.content}>
      <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:20 }}>
        <div>
          <div style={S.card}>
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <div style={{ ...S.avatar(avatarColor(user.name)), width:72, height:72, fontSize:26, margin:"0 auto 12px", boxShadow:`0 0 0 4px ${avatarColor(user.name)}33` }}>{getInitials(user.name)}</div>
              <div style={{ fontSize:18, fontWeight:700 }}>{user.name}</div>
              <div style={{ color:"#8b949e", fontSize:13, marginBottom:8 }}>{user.email}</div>
              <span style={S.badge(ROLE_COLORS[user.role])}>{user.role}</span>
            </div>
            <div style={{ borderTop:"1px solid #21262d", paddingTop:16 }}>
              {[ ["Department",user.dept],["Phone",user.phone],["Joined",user.joined],["Status",user.status] ].map(([l,v])=>(
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #21262d", fontSize:13 }}>
                  <span style={{ color:"#8b949e" }}>{l}</span><span style={{ fontWeight:500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={S.card}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:12, color:"#e6edf3" }}>Your Permissions</div>
            {rolePerms.map(p=>(
              <div key={p} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:"1px solid #21262d", fontSize:13 }}>
                <span style={{ color:"#3fb950", fontSize:11 }}>✓</span>
                <span style={{ color:"#8b949e" }}>{p}</span>
              </div>
            ))}
            <div style={{ marginTop:12, padding:"10px 12px", background:"#0d1117", borderRadius:8, border:"1px solid #21262d" }}>
              <div style={{ fontSize:10, color:"#6e7681", marginBottom:4 }}>MySQL</div>
              <div style={{ fontSize:10, color:"#8b949e", fontFamily:"monospace" }}>SELECT p.permission FROM role_permissions p JOIN roles r ON p.role_id=r.id WHERE r.name='{user.role}';</div>
            </div>
          </div>
        </div>
        <div style={S.card}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
            <div style={{ fontSize:16, fontWeight:600 }}>Profile Information</div>
            {!editMode
              ? <button style={S.btn("blue")} onClick={()=>setEditMode(true)}>Edit Profile</button>
              : <div style={{ display:"flex", gap:8 }}>
                  <button style={S.btn("ghost")} onClick={()=>{ setForm({...user}); setEditMode(false); }}>Cancel</button>
                  <button style={S.btn("primary")} onClick={handleSave}>Save</button>
                </div>
            }
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 20px" }}>
            {[ ["Full Name","name","text"],["Email","email","email"],["Phone","phone","text"] ].map(([l,k,t])=>(
              <div key={k} style={S.formRow}>
                <label style={S.label}>{l}</label>
                {editMode ? <input style={S.input} type={t} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} /> : <div style={{ fontSize:14, color:"#e6edf3", padding:"9px 0" }}>{user[k]}</div>}
              </div>
            ))}
            <div style={S.formRow}>
              <label style={S.label}>Department</label>
              {editMode ? <select style={S.select} value={form.dept} onChange={e=>setForm(p=>({...p,dept:e.target.value}))}>{DEPTS.map(o=><option key={o}>{o}</option>)}</select> : <div style={{ fontSize:14, color:"#e6edf3", padding:"9px 0" }}>{user.dept}</div>}
            </div>
          </div>
          <div style={{ marginTop:8, padding:"14px", background:"#0d1117", borderRadius:10, border:"1px solid #21262d" }}>
            <div style={{ fontSize:11, color:"#6e7681", marginBottom:6, fontWeight:600 }}>MySQL Query (on save)</div>
            <div style={{ fontSize:11, color:"#8b949e", fontFamily:"monospace" }}>UPDATE users SET name='{form.name}', email='{form.email}', phone='{form.phone}', dept='{form.dept}' WHERE id={user.id};</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div style={{ ...S.content, display:"flex", alignItems:"center", justifyContent:"center", minHeight:400 }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🔒</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#f85149", marginBottom:8 }}>Access Denied</div>
        <div style={{ color:"#8b949e", fontSize:14 }}>You do not have permission to view this page.</div>
      </div>
    </div>
  );
}

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [users, setUsers] = useState(DB.users);
  const [toastMsg, setToastMsg] = useState("");
  const toast = (msg) => { setToastMsg(msg); setTimeout(()=>setToastMsg(""), 3000); };
  const handleLogin = (user) => { setAuthUser(user); setPage("dashboard"); };
  const handleLogout = () => { setAuthUser(null); setPage("dashboard"); };
  if (!authUser) return <LoginPage onLogin={handleLogin} />;
  const isAdmin = authUser.role === "Admin";
  const isMgrPlus = isAdmin || authUser.role === "Manager";
  const renderPage = () => {
    if (page==="dashboard") return <Dashboard users={users} user={authUser} />;
    if (page==="users")     return isAdmin ? <UserManagement users={users} setUsers={setUsers} toast={toast} /> : <AccessDenied />;
    if (page==="roles")     return isAdmin ? <RoleManagement toast={toast} /> : <AccessDenied />;
    if (page==="reports")   return isMgrPlus ? <Reports users={users} /> : <AccessDenied />;
    if (page==="logs")      return isAdmin ? <ActivityLogs users={users} /> : <AccessDenied />;
    if (page==="profile")   return <MyProfile user={authUser} setUser={setAuthUser} toast={toast} />;
    return <Dashboard users={users} user={authUser} />;
  };
  return (
    <div style={S.root}>
      <div style={S.layout}>
        <Sidebar page={page} setPage={setPage} user={authUser} />
        <div style={S.main}>
          <Topbar page={page} user={authUser} onLogout={handleLogout} />
          {renderPage()}
        </div>
      </div>
      <Toast msg={toastMsg} onClose={()=>setToastMsg("")} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
