import React, { useState, useEffect } from 'react';
import { 
  Shield, Lock, Globe, Server, 
  ArrowRight, AlertTriangle,
  Share2, Menu, X, Hash, 
  Terminal, Database, Eye, 
  FileWarning, Cpu, Scale,
  User, GraduationCap, Building2, IdCard,
  Calendar, Check, Copy
} from 'lucide-react';

// --- COMPONENT: PASSWORD METER ---
const PasswordStrength = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');

  const checkStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, msg: '' };
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return { 
      score, 
      msg: score < 2 ? 'Lemah (Mudah dibobol Brute Force)' : score < 4 ? 'Sedang (Cukup Aman)' : 'Sangat Kuat (Enkripsi Grade)' 
    };
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    const res = checkStrength(val);
    setStrength(res.score);
    setFeedback(res.msg);
  };

  return (
    <div className="my-12 p-6 bg-[#1a1a1a] rounded-xl border border-stone-800 text-white not-prose shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Lock size={100} />
      </div>
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="p-2 bg-red-600 rounded-lg"><Lock className="text-white" size={20} /></div>
        <h3 className="text-lg font-bold font-display text-white m-0">Simulasi: Cek Kekuatan Password</h3>
      </div>
      <p className="text-sm text-stone-400 mb-4 relative z-10">
        Salah satu celah terbesar adalah password lemah. Coba ketik password Anda di bawah ini untuk melihat ketahanannya terhadap serangan <em>Brute Force</em>.
      </p>
      
      <input 
        type="text" 
        value={password}
        onChange={handleChange}
        placeholder="Ketik contoh password..."
        className="w-full p-3 rounded bg-black border border-stone-700 focus:border-red-600 focus:outline-none text-white font-mono relative z-10"
      />
      
      <div className="mt-4 h-1.5 w-full bg-stone-800 rounded-full overflow-hidden relative z-10">
        <div 
          className={`h-full transition-all duration-500 ${strength < 2 ? 'bg-red-600' : strength < 4 ? 'bg-yellow-500' : 'bg-green-500'}`} 
          style={{ width: password ? `${(strength / 4) * 100}%` : '0%' }}
        ></div>
      </div>
      <p className={`mt-2 text-xs font-bold uppercase tracking-widest relative z-10 ${strength < 2 ? 'text-red-500' : strength < 4 ? 'text-yellow-500' : 'text-green-500'}`}>
        Status: {password ? feedback : 'Menunggu Input...'}
      </p>
    </div>
  );
};
// ---------------------------------

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- CONFIG GAMBAR (PASTIKAN FILE ADA DI FOLDER PUBLIC) ---
  const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1483817101829-339b08e8d83f?q=80&w=1404&auto=format&fit=crop";
  
  const LOGO_URL = "/logo-bagaskara.png"; 
  const PROFILE_URL = "/profile-bagaskara.jpg";
  
  // Update: Menggunakan file lokal
  const UPN_LOGO_URL = "/logo-upn.png"; 
  // ---------------------

  const timelineEvents = [
    { year: "Agustus 2022", title: "Fenomena Bjorka", desc: "Hacker anonim 'Bjorka' muncul di Breached.to, membocorkan 1.3 Miliar data SIM Card dan surat rahasia BIN.", side: "right" },
    { year: "Mei 2023", title: "BSI Ransomware", desc: "Layanan Bank Syariah Indonesia lumpuh total selama 4 hari akibat serangan Ransomware LockBit 3.0.", side: "left" },
    { year: "Juni 2024", title: "PDN Tumbang", desc: "Pusat Data Nasional diserang ransomware Brain Cipher. Layanan imigrasi dan 210 instansi daerah mati total.", side: "right" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Darurat Kebocoran Data Nasional',
      text: 'Analisis mendalam tentang kasus Bjorka, Ransomware PDN, dan Zero Trust Security - UAS PSJ.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link artikel berhasil disalin ke clipboard!');
      } catch (clipboardErr) {
        alert('Gagal membagikan artikel. Silakan copy URL secara manual.');
      }
    }
  };

  const sections = [
    { id: 'intro', title: 'Krisis Siber' },
    { id: 'history', title: 'Timeline Serangan' },
    { id: 'technical', title: 'Analisis Teknis' },
    { id: 'zerotrust', title: 'NIST Zero Trust' },
    { id: 'law', title: 'UU PDP & SDM' },
    { id: 'conclusion', title: 'Kesimpulan' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-red-900 selection:text-white overflow-x-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&display=swap');
        body { font-family: 'Lora', serif; }
        h1, h2, h3, h4, .font-display { font-family: 'Playfair Display', serif; }
        .font-ui, button, nav, .caption { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="fixed top-0 left-0 h-1 bg-red-700 z-[70]" style={{ width: `${readingProgress}%` }} />

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#FDFBF7]/95 backdrop-blur-md border-stone-200 py-3' : 'bg-[#FDFBF7] border-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center font-ui">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={LOGO_URL} 
                alt="Logo Bagaskara" 
                className="w-full h-full object-contain drop-shadow-sm"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="hidden w-8 h-8 bg-black text-white items-center justify-center rounded-sm">
                 <Shield size={16} strokeWidth={3} />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight text-black">CYBER<span className="text-red-700">REPORT</span></span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">UAS PSJ 2025</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
             {sections.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} className="hover:text-red-700 transition-colors uppercase tracking-wider text-[11px]">{sec.title}</a>
              ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
             <a href="https://www.upnyk.ac.id" target="_blank" rel="noreferrer" className="text-xs font-bold border border-black px-4 py-2 hover:bg-black hover:text-white transition-all uppercase tracking-widest">  UPN Veteran</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-black">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#FDFBF7] border-b border-stone-200 p-6 flex flex-col gap-4 font-ui shadow-xl md:hidden">
             {sections.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-stone-800 py-2 border-b border-stone-100">{sec.title}</a>
              ))}
             <div className="mt-4 pt-4 border-t border-stone-100">
                <p className="text-xs font-bold uppercase text-stone-400 mb-2">Penulis</p>
                <p className="font-bold">Muhammad Bagaskara Daffa Aryanto</p>
                <p className="text-xs text-stone-500">123220180</p>
             </div>
          </div>
        )}
      </nav>

      <main className="pt-28 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        <header className="relative rounded-[30px] md:rounded-[40px] overflow-hidden bg-stone-900 mb-10 md:mb-24 group min-h-[50vh] md:min-h-[60vh] flex items-center justify-center">
           <div className="absolute inset-0 z-0">
              <img src={HERO_IMAGE_URL} alt="Cyber Security Background" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out mix-blend-overlay scale-105 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/60"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-12 md:py-20">
               <div className="flex items-center justify-center gap-3 mb-6 md:mb-8 font-ui animate-fade-in">
                  <span className="px-3 py-1 bg-red-900/50 text-red-100 text-[10px] font-bold uppercase tracking-widest border border-red-800/50 backdrop-blur-md rounded-full">Critical Analysis</span>
                  <span className="text-stone-300 text-xs uppercase tracking-widest font-semibold">Desember 2025</span>
               </div>
               <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6 md:mb-8 drop-shadow-lg">
                 Darurat Kebocoran <br/> <i className="font-serif font-medium text-red-500">Data Nasional.</i>
               </h1>
               <p className="text-base md:text-2xl text-stone-200 font-serif leading-relaxed max-w-3xl mx-auto italic border-l-4 border-red-600/50 pl-4 md:pl-0 md:border-none drop-shadow-md text-left md:text-center">
                 "Refleksi brutal atas runtuhnya pertahanan siber Indonesia: Dari Bjorka hingga kelumpuhan PDN, dan mengapa Zero Trust adalah satu-satunya jalan pulang."
               </p>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
           {/* MOBILE PROFILE */}
           <div className="block lg:hidden col-span-1 mb-4">
              <div className="border border-stone-200 bg-white p-5 shadow-sm rounded-xl flex items-center gap-5">
                 <div className="w-16 h-16 bg-stone-100 rounded-full border border-stone-200 shrink-0 overflow-hidden">
                    <img src={PROFILE_URL} alt="Profile Mobile" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerHTML='<div class="flex items-center justify-center h-full text-stone-400"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>'}}/>
                 </div>
                 <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-black leading-tight">Muhammad Bagaskara Daffa Aryanto</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-widest rounded border border-red-100">123220180</span>
                      <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-widest rounded border border-stone-200">Informatika</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* SIDEBAR PROFILE */}
           <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                 <div className="border border-stone-200 bg-white p-6 shadow-sm rounded-sm">
                    <div className="flex flex-col items-center text-center">
                       <div className="w-24 h-24 bg-stone-100 rounded-full mb-4 border border-stone-200 overflow-hidden shadow-sm">
                          <img src={PROFILE_URL} alt="Profile Desktop" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerHTML='<div class="flex items-center justify-center h-full text-stone-400"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>'}}/>
                       </div>
                       <h3 className="font-display font-bold text-lg text-black leading-tight mb-1">Muhammad Bagaskara<br/>Daffa Aryanto</h3>
                       <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-widest rounded mt-1 mb-4">Penulis</span>
                       <div className="w-full space-y-3 text-left">
                          <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                             <IdCard size={14} className="text-stone-400 mt-0.5 shrink-0"/>
                             <div><p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider">NIM</p><p className="text-xs font-medium text-stone-800 font-ui">123220180</p></div>
                          </div>
                          <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                             <GraduationCap size={14} className="text-stone-400 mt-0.5 shrink-0"/>
                             <div><p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider">Jurusan</p><p className="text-xs font-medium text-stone-800 font-ui">Teknik Informatika</p></div>
                          </div>
                          <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                             <Building2 size={14} className="text-stone-400 mt-0.5 shrink-0"/>
                             <div><p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider">Kampus</p><p className="text-xs font-medium text-stone-800 font-ui">UPN "Veteran" Yogyakarta</p></div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="mt-6 p-4 bg-stone-50 rounded-sm border border-stone-100">
                    <p className="font-ui text-[10px] leading-relaxed text-stone-500 text-center">Artikel ini disusun untuk memenuhi tugas UAS Pengamanan Sistem Jaringan.</p>
                 </div>
              </div>
           </aside>

           {/* ARTICLE */}
           <article className="col-span-1 lg:col-span-7 prose prose-lg prose-stone max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-black prose-p:text-stone-700 prose-p:leading-8 prose-p:text-justify prose-a:text-red-700 prose-a:no-underline prose-a:border-b prose-a:border-red-200 hover:prose-a:border-red-700 prose-strong:text-black prose-strong:font-bold prose-li:text-justify">
              <section id="intro" className="scroll-mt-32">
                <span className="font-display text-6xl float-left mr-3 mt-[-10px] text-red-700 font-bold">I</span>
                <p className="lead font-serif text-xl md:text-2xl text-stone-800 mb-8 italic">ndonesia sedang berjalan di atas "jembatan kaca" digital yang retak. Di permukaan, kita melihat kilauan inovasi: ekonomi digital yang diproyeksikan mencapai $146 miliar pada 2025, adopsi QRIS yang masif, hingga digitalisasi layanan pemerintahan. Namun, di balik itu, fondasi keamanan siber kita sedang mengalami pengeroposan yang sistemik.</p>
                <p>Istilah "kebocoran data" kini bukan lagi jargon eksklusif ruang server yang dingin; ia telah menjadi topik hangat di warung kopi hingga ruang rapat kabinet. Masyarakat awam mulai merasakan dampak langsungnya: nomor WhatsApp yang dibombardir tawaran judi online, penipuan rekayasa sosial (<em>social engineering</em>) yang semakin presisi karena pelaku memiliki data lengkap korban, hingga penyalahgunaan Nomor Induk Kependudukan (NIK) untuk pinjaman online ilegal.</p>
                <p>Fenomena ini menandakan satu hal krusial: <strong>Infrastruktur digital Indonesia rapuh.</strong> Pengamanan Sistem Jaringan (PSJ) yang selama ini diterapkan terbukti gagal menghadapi lanskap ancaman modern. Artikel ini akan membedah secara komprehensif kegagalan paradigma keamanan konvensional, mulai dari kasus Bjorka hingga kelumpuhan Pusat Data Nasional (PDN), dan menyajikan argumen teknis mengapa arsitektur <em>Zero Trust</em> adalah satu-satunya mitigasi yang masuk akal.</p>
              </section>
              <hr className="my-12 border-stone-200 w-1/3 mx-auto" />

              <section id="history" className="scroll-mt-32">
                 <h2 className="text-3xl md:text-4xl mb-8">Timeline Serangan Siber</h2>
                 <p className="mb-10">Periode 2022 hingga pertengahan 2025 dapat dicatat sebagai "Tahun-Tahun Kelam" bagi kedaulatan siber Indonesia. Berikut adalah kronologi serangan besar yang melumpuhkan operasional negara.</p>
                 <div className="relative wrap overflow-hidden p-4 h-full">
                    <div className="absolute border-opacity-20 border-stone-400 h-full border-l-2 left-4 md:left-1/2 top-0" style={{ transform: 'translateX(-50%)' }}></div>
                    {timelineEvents.map((event, index) => (
                      <div key={index} className={`mb-8 flex justify-between items-center w-full ${event.side === 'left' ? 'md:flex-row-reverse' : ''}`}>
                        <div className="hidden md:block w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-red-700 shadow-xl w-6 h-6 rounded-full border-4 border-[#FDFBF7] absolute left-4 md:left-1/2 transform -translate-x-1/2"></div>
                        <div className="order-1 bg-white rounded-lg shadow-md w-full ml-12 md:ml-0 md:w-5/12 px-6 py-4 border border-stone-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-2 mb-2">
                             <Calendar size={14} className="text-red-700"/>
                             <h3 className="font-bold text-red-700 text-sm uppercase tracking-wider">{event.year}</h3>
                          </div>
                          <h4 className="font-bold text-stone-900 text-lg mb-2">{event.title}</h4>
                          <p className="text-sm leading-snug text-stone-600 text-justify">{event.desc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
                 <div className="not-prose mt-12 mb-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200 shadow-sm">
                    {[{ icon: <Hash/>, label: "SIM Card", val: "1.3 Miliar", desc: "Data registrasi prabayar (NIK, KK) dijual seharga $50.000." }, { icon: <Database/>, label: "KPU Leak", val: "105 Juta", desc: "Data pemilih lengkap dengan detail demografis." }, { icon: <FileWarning/>, label: "Surat BIN", val: "Top Secret", desc: "Dokumen korespondensi intelijen dengan Presiden RI." }, { icon: <Shield/>, label: "BPJS", val: "279 Juta", desc: "Data medis, gaji, dan anggota keluarga peserta." }].map((item, idx) => (
                      <div key={idx} className="bg-[#FDFBF7] p-6 flex flex-col justify-between hover:bg-white transition-colors">
                         <div className="text-red-700 mb-4">{item.icon}</div>
                         <div><h4 className="font-display text-2xl font-bold text-black mb-1">{item.val}</h4><p className="font-ui text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">{item.label}</p><p className="font-serif text-sm text-stone-600 leading-snug">{item.desc}</p></div>
                      </div>
                    ))}
                 </div>
              </section>

              <section id="technical" className="scroll-mt-32">
                 <h2 className="text-3xl md:text-4xl mt-12 mb-6">Analisis Teknis: Mengapa Mudah Jebol?</h2>
                 <p>Mengapa infrastruktur kita begitu rapuh? Berdasarkan analisis forensik digital dari berbagai sumber keamanan (open source intelligence), terdapat tiga vektor serangan utama yang dieksploitasi:</p>
                 <div className="pl-6 border-l-4 border-stone-800 space-y-8 my-8">
                    <div><h3 className="text-xl font-bold text-black mt-0 flex items-center gap-2"><Cpu size={20}/> 1. API Security yang Buruk (OWASP API Top 10)</h3><p className="mt-2 text-base">Banyak aplikasi "Super Apps" pemerintah dibangun dengan tergesa-gesa demi mengejar target peluncuran. Celah keamanan <strong>API:1 (Broken Object Level Authorization - BOLA)</strong> sangat umum ditemukan. Penyerang cukup memanipulasi ID pengguna di URL request API untuk mengakses data pengguna lain tanpa validasi yang memadai. <strong>Firewall tradisional (WAF) seringkali gagal mendeteksi serangan ini karena lalu lintas datanya terlihat sah (menggunakan protokol HTTP port 80/443 standar), padahal payload di dalamnya berbahaya.</strong></p></div>
                    
                    {/* --- FITUR TAMBAHAN: PASSWORD METER --- */}
                    <PasswordStrength />
                    {/* -------------------------------------- */}

                    <div><h3 className="text-xl font-bold text-black mt-0 flex items-center gap-2"><Globe size={20}/> 2. Eksposur Kredensial & Infostealer</h3><p className="mt-2 text-base">Banyak kebocoran bermula dari perangkat pegawai yang terinfeksi <em>malware infostealer</em> (seperti RedLine Stealer) karena mengunduh software bajakan atau mengklik link phising. Kredensial VPN atau akses dashboard admin kemudian dicuri dan dijual di *Dark Web* oleh *Initial Access Brokers*. <strong>Dengan kredensial ini, peretas tidak perlu "mendobrak" pintu; mereka masuk secara "sah" menggunakan username dan password valid milik pegawai, sehingga tidak memicu alarm sistem deteksi intrusi (IDS).</strong></p></div>
                    <div><h3 className="text-xl font-bold text-black mt-0 flex items-center gap-2"><Server size={20}/> 3. Flat Network & Lateral Movement</h3><p className="mt-2 text-base">Arsitektur jaringan internal di Indonesia umumnya "datar" (flat network). Artinya, sekali peretas berhasil masuk (misal lewat komputer resepsionis yang kena phising), mereka bisa bergerak bebas (lateral movement) ke server database inti tanpa hambatan (segmentasi) yang berarti. <strong>Tidak adanya pemisahan VLAN (Virtual LAN) yang ketat antara jaringan publik, jaringan karyawan, dan jaringan server inti memudahkan peretas untuk melakukan eskalasi hak akses (Privilege Escalation) hingga menguasai Domain Controller.</strong></p></div>
                 </div>
              </section>

              <section id="perimeter" className="my-16 scroll-mt-32">
                 <div className="relative bg-black text-[#FDFBF7] p-10 md:p-14 overflow-hidden shadow-2xl">
                    <Terminal className="absolute -right-10 -bottom-10 w-64 h-64 text-stone-800 opacity-30" />
                    <h2 className="relative z-10 text-white font-display text-4xl md:text-5xl italic mb-6">"Perimeter is Dead."</h2>
                    <p className="relative z-10 font-serif text-lg md:text-xl text-stone-300 leading-relaxed">Paradigma "Kastil dan Parit" (Castle and Moat) di mana kita percaya bahwa semua yang ada di dalam jaringan kantor aman, sudah usang. Di era Cloud dan WFH, batas fisik jaringan telah hilang. Identitas adalah perimeter baru. Kita harus berasumsi bahwa jaringan kita <strong>sudah</strong> disusupi.</p>
                 </div>
              </section>

              <section id="zerotrust" className="scroll-mt-32">
                 <h2 className="text-3xl md:text-4xl mb-6">Solusi Mutlak: NIST Zero Trust Architecture</h2>
                 <p>Untuk menghentikan pendarahan ini, BSSN dan seluruh stakeholder IT harus mengadopsi kerangka kerja <strong>NIST SP 800-207</strong> tentang Zero Trust Architecture (ZTA). Filosofinya: <em>"Never Trust, Always Verify"</em>. Ini bukan produk yang dibeli, melainkan strategi.</p>
                 <h4 className="font-bold text-lg mt-6 mb-2">3 Prinsip Utama Zero Trust:</h4>
                 <ul className="list-none pl-0 space-y-6 mt-4">
                    {[{ title: "1. Verify Explicitly (Verifikasi Eksplisit)", text: "Setiap permintaan akses—baik dari internal maupun eksternal—harus divalidasi berdasarkan semua titik data yang tersedia: identitas user, lokasi, kesehatan perangkat, dan klasifikasi data. Sistem harus menerapkan Multi-Factor Authentication (MFA) yang adaptif. Jika seorang user biasanya login dari Jakarta tiba-tiba login dari Rusia, sistem harus otomatis menolak atau meminta verifikasi biometrik tambahan. Tidak ada 'trust' otomatis hanya karena user berada di kantor." }, { title: "2. Use Least Privilege Access (Akses Terendah)", text: "Batasi akses pengguna dengan Just-In-Time (JIT) dan Just-Enough-Access (JEA). Admin database tidak boleh memiliki akses ke seluruh data penduduk setiap saat. Akses diberikan hanya saat tiket perbaikan dibuka dan dicabut segera setelah selesai. Ini membatasi 'Blast Radius' atau dampak kerusakan jika akun tersebut berhasil diretas." }, { title: "3. Assume Breach (Asumsikan Peretasan)", text: "Desain sistem dengan mentalitas bahwa peretas SUDAH ada di dalam jaringan. Implementasikan enkripsi end-to-end dan Micro-segmentation. Micro-segmentation memecah jaringan menjadi zona-zona keamanan yang sangat kecil. Bahkan jika satu server web diretas, penyerang tidak bisa melompat ke server database karena diblokir oleh kebijakan keamanan granular." }].map((point, i) => (
                      <li key={i} className="flex gap-4 items-start bg-white p-6 border border-stone-200 shadow-sm transition-shadow hover:shadow-md">
                         <div className="mt-1 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i+1}</div>
                         <div><strong className="block text-black text-lg mb-2">{point.title}</strong><span className="text-stone-700 text-base leading-relaxed">{point.text}</span></div>
                      </li>
                    ))}
                 </ul>
              </section>

              <section id="law" className="scroll-mt-32">
                 <h2 className="text-3xl md:text-4xl mt-12 mb-6">Payung Hukum & Krisis SDM</h2>
                 <p>Secara regulasi, Indonesia sebenarnya sudah memiliki senjata ampuh: <strong>UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)</strong>. UU ini mengubah lanskap tanggung jawab keamanan data.</p>
                 <p>Dalam UU PDP, kelalaian dalam melindungi data pribadi dapat dikenai sanksi administratif berupa denda hingga <strong>2% dari pendapatan tahunan</strong> organisasi. Selain itu, setiap instansi (Pengendali Data) wajib menunjuk <strong>Data Protection Officer (DPO)</strong> yang bertanggung jawab memastikan kepatuhan perlindungan data. Namun, hukum hanyalah "macan kertas" tanpa penegakan teknis dan kepatuhan terhadap standar internasional seperti <strong>ISO 27001</strong>.</p>
                 <div className="my-8 bg-stone-100 p-6 border-l-4 border-red-700">
                    <h4 className="font-bold text-black flex items-center gap-2"><Scale size={18}/> Defisit Talenta Keamanan Siber</h4>
                    <p className="text-base mt-2 text-stone-700 leading-relaxed">Tantangan terbesar implementasi UU PDP dan Zero Trust adalah SDM. Indonesia mengalami defisit talenta <em>Cyber Security</em> sekitar 9 juta orang menurut data Bank Dunia. Kita memiliki banyak programmer, tetapi sangat sedikit <em>Security Analyst</em>, <em>Incident Responder</em>, dan <em>Penetration Tester</em> yang kompeten. <strong>Banyak organisasi membeli alat keamanan mahal tetapi tidak memiliki staf yang bisa mengonfigurasi dan memonitornya dengan benar.</strong></p>
                 </div>
                 
                 {/* --- UPN CARD DENGAN LOGO LOKAL --- */}
                 <a href="https://www.upnyk.ac.id" target="_blank" rel="noopener noreferrer" className="not-prose block my-10 border-y-2 border-black py-8 group hover:bg-stone-100 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                       <div className="flex items-start gap-4">
                          {/* Logo UPN Lokal */}
                          <img 
                            src={UPN_LOGO_URL} 
                            alt="Logo UPN" 
                            className="w-14 h-14 object-contain shrink-0" 
                            onError={(e) => {e.target.style.display='none'}}
                          />
                          <div>
                            <p className="font-ui text-xs font-bold uppercase tracking-widest text-red-700 mb-2">Pusat Pendidikan Bela Negara</p>
                            <h3 className="font-display text-2xl font-bold text-black group-hover:underline decoration-2 underline-offset-4">UPN "Veteran" Yogyakarta</h3>
                            <p className="font-serif text-sm text-stone-600 mt-2 max-w-lg text-justify">Institusi pendidikan tinggi seperti <strong>UPN "Veteran" Yogyakarta</strong> memegang peran kunci dalam menutup celah ini. Melalui kurikulum yang mengintegrasikan semangat Bela Negara dengan kompetensi teknis (Kriptografi, Forensik Digital, Ethical Hacking), kampus melahirkan garda terdepan pertahanan siber Indonesia. Mahasiswa tidak hanya diajarkan coding, tetapi juga pola pikir defensif dan ofensif (<em>Red Teaming & Blue Teaming</em>).</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-2 font-ui text-sm font-bold uppercase tracking-widest text-black flex-shrink-0 self-center md:self-auto">Kunjungi Kampus <ArrowRight size={16}/></div>
                    </div>
                 </a>
                 {/* ---------------------------- */}

              </section>

              <section id="conclusion" className="bg-stone-900 text-stone-300 p-8 md:p-12 mt-12 rounded-sm shadow-2xl">
                 <h3 className="text-xl font-bold uppercase tracking-widest mb-4 font-ui text-white">Kesimpulan</h3>
                 <p className="mb-6 leading-relaxed">Keamanan siber bukanlah produk yang bisa dibeli ("set and forget"), melainkan sebuah proses yang berkelanjutan. Kasus Bjorka dan insiden PDN adalah "Blessing in Disguise" (berkah terselubung) yang menampar kita untuk bangun dari tidur panjang. </p>
                 <p className="mb-6 leading-relaxed">Kita tidak bisa lagi mengandalkan tembok api kuno. Transformasi menuju <strong>Zero Trust Architecture</strong>, penegakan tegas <strong>UU PDP</strong>, dan investasi masif pada <strong>Human Capital</strong> adalah tiga pilar mutlak yang harus ditegakkan. Jika tidak, kedaulatan kita di dunia maya hanyalah ilusi, dan kita akan terus menjadi "tamu" di rumah digital kita sendiri.</p>
                 <p className="font-display text-2xl font-bold italic text-white border-l-4 border-red-600 pl-4">"Masa depan Indonesia ada di tangan mereka yang mampu mengamankan datanya."</p>
              </section>

              <div className="mt-16 pt-8 border-t border-stone-300 flex flex-col md:flex-row justify-between items-end font-ui gap-4 relative z-10">
                 <div>
                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Author</p>
                    <p className="font-bold text-black text-lg">Muhammad Bagaskara Daffa Aryanto.</p>
                    <p className="text-xs text-stone-500 mt-1">Mahasiswa Teknik Informatika UPN Veteran Yogyakarta</p>
                 </div>
                 <button 
                    onClick={handleShare} 
                    className="relative z-20 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-red-700 transition-colors border border-stone-300 bg-white px-5 py-3 rounded-full cursor-pointer active:scale-95 touch-manipulation shadow-sm"
                 >
                    <Share2 size={16}/> Share Article
                 </button>
              </div>

           </article>

           <div className="hidden lg:block lg:col-span-2 relative">
              <div className="sticky top-32 border-l border-stone-200 pl-6 h-[50vh] flex flex-col justify-center opacity-40">
                 <div className="writing-vertical-rl text-xs font-bold uppercase tracking-[0.3em] text-stone-400 rotate-180 flex items-center gap-4">
                    <span>•</span> National Cyber Security Analysis <span>•</span> 2025
                 </div>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
};

export default App;