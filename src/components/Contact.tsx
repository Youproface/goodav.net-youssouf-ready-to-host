const heroBackground = '/images/all_site_images/Home/BG/Home_BG.png';
export default function Contact() {
    return (
      <main className="bg-[#0f1012] text-zinc-100">
        {/* Hero */}
        <div className="relative mt-10 py-32 px-4 bg-transparent">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="About GoodAV"
            className="w-full h-full object-cover opacity-30"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b " />
        </div>
        
        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r text-white bg-clip-text text-transparent">
          CONTACT AND CONNECT WITH US
          </h1>
        </div>
      
      </div>
  
  
     
       
      </main>
    );
  }
  
  /* ——— subcomponents ——— */
  
  function Label({ children }: { children: React.ReactNode }) {
    return <label className="block text-small font-medium text-zinc-300">{children}</label>;
  }
  
  function Input({
    label,
    name,
    type = "text",
    placeholder,
  }: {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
  }) {
    return (
      <div>
        <Label>{label}</Label>
        <input
          type={type}
          name={name}
          placeholder={placeholder ?? label}
          className="mt-2 w-full rounded-xl bg-white/[0.06] px-3 py-2 text-body text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60"
        />
      </div>
    );
  }
  
  function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange-500/15 text-lg text-orange-300 ring-1 ring-white/10">
            {icon}
          </span>
          <div>
            <div className="text-small text-zinc-400">{label}</div>
            <div className="text-body font-semibold text-zinc-100">{value}</div>
          </div>
        </div>
      </div>
    );
  }
  