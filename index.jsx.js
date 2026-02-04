import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  Palette, 
  Layout, 
  Smartphone, 
  Target, 
  Image as ImageIcon,
  Loader2,
  Quote
} from 'lucide-react';

const apiKey = "";

// Image Generation Component with Nano Banana (gemini-2.5-flash-image-preview)
const GeneratedImage = ({ prompt, alt }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const generateImage = async (retryCount = 0) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Photorealistic high-quality image: ${prompt}. Professional, high resolution, cinematic lighting.` }] }],
            generationConfig: { responseModalities: ['IMAGE'] }
          })
        });

        if (!response.ok) {
          if (retryCount < 5) {
            const delay = Math.pow(2, retryCount) * 1000;
            setTimeout(() => generateImage(retryCount + 1), delay);
            return;
          }
          throw new Error('API failed');
        }

        const result = await response.json();
        const base64 = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
        if (base64) {
          setImage(`data:image/png;base64,${base64}`);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, [prompt]);

  if (loading) {
    return (
      <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center rounded-xl animate-pulse border-2 border-dashed border-slate-200">
        <Loader2 className="animate-spin text-rust mb-2" />
        <span className="text-xs text-slate-400 font-sans uppercase tracking-widest">Generating Visual...</span>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="w-full h-full bg-slate-200 flex items-center justify-center rounded-xl">
        <ImageIcon className="text-slate-400" size={48} />
      </div>
    );
  }

  return <img src={image} alt={alt} className="w-full h-full object-cover rounded-xl shadow-lg border border-white/20" />;
};

const SlideContainer = ({ children, title, subtitle, bgClass = "bg-[#F7EDE6]" }) => (
  <div className={`w-full h-full flex flex-col p-12 relative overflow-hidden ${bgClass} text-[#161C27]`}>
    <header className="mb-8 flex justify-between items-start border-b border-rust/20 pb-4">
      <div>
        <h2 className="text-rust font-sans font-bold text-xs uppercase tracking-[0.3em] mb-1">Insight Thrive App</h2>
        <h1 className="text-4xl font-serif text-[#161C27] tracking-tight">{title}</h1>
      </div>
      <div className="h-10 w-auto opacity-80">
        <svg viewBox="0 0 200 60" className="h-full">
           <text x="0" y="45" fontFamily="Playfair Display" fontSize="35" fontWeight="bold" fill="#C8502C">INSIGHT</text>
        </svg>
      </div>
    </header>
    <div className="flex-1 flex gap-12 items-center">
      {children}
    </div>
    <footer className="mt-8 text-[10px] text-slate-400 font-sans tracking-widest flex justify-between items-center border-t border-rust/10 pt-4">
      <span>© 2024 INSIGHT COUNSELING & TRAINING CENTER</span>
      <span>STANDARD LESSON BLUEPRINT</span>
    </footer>
  </div>
);

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "The Power of Standardization",
      content: (
        <>
          <div className="w-1/2 space-y-6">
            <p className="text-xl font-serif italic text-slate-600 leading-relaxed">
              "Consistency builds trust. A repeatable structure aids retention."
            </p>
            <div className="space-y-4 font-sans leading-relaxed text-slate-800">
              <p>To overcome platform constraints and ensure a seamless user experience, we utilize a consistent, repeatable layout for every lesson.</p>
              <p>Passion.IO offers limited customization; our blueprint turns these constraints into a cohesive design system based on the <strong>Thriving Teen Toolkit</strong>.</p>
            </div>
          </div>
          <div className="w-1/2 aspect-square max-h-[500px]">
            <GeneratedImage 
              prompt="A professional workspace with architectural blueprints, a wooden model, and precise drafting tools, cinematic soft lighting, warm tones" 
              alt="Architecture and Structure" 
            />
          </div>
        </>
      )
    },
    {
      title: "Brand Visual Language",
      content: (
        <>
          <div className="w-1/2 grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-rust/10">
              <h3 className="text-rust font-bold text-xs mb-4 flex items-center gap-2"><Palette size={14}/> COLOR PALETTE</h3>
              <div className="flex gap-2 mb-4">
                <div className="w-10 h-10 rounded bg-[#161C27] shadow-inner" title="Navy"></div>
                <div className="w-10 h-10 rounded bg-[#C8502C] shadow-inner" title="Rust"></div>
                <div className="w-10 h-10 rounded bg-[#FFAB23] shadow-inner" title="Yellow"></div>
                <div className="w-10 h-10 rounded bg-[#F7EDE6] shadow-inner border border-slate-200" title="Sand"></div>
              </div>
              <p className="text-[10px] text-slate-500 font-sans uppercase tracking-tighter">Navy · Rust · Yellow · Sand</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-rust/10">
              <h3 className="text-rust font-bold text-xs mb-4 flex items-center gap-2">Aa TYPOGRAPHY</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-serif text-2xl">Playfair Display</p>
                  <p className="text-[10px] uppercase text-slate-400 tracking-widest">Main Headings</p>
                </div>
                <div>
                  <p className="font-sans text-xl font-semibold">Montserrat</p>
                  <p className="text-[10px] uppercase text-slate-400 tracking-widest">Body & UI Text</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-rust/10 col-span-2">
              <h3 className="text-rust font-bold text-xs mb-4 flex items-center gap-2"><ImageIcon size={14}/> ASSET SPECS</h3>
              <div className="flex justify-between font-sans text-sm">
                <div>
                  <p className="font-bold">Course Image</p>
                  <p className="text-slate-500">1024 x 1024 px</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Lesson Image</p>
                  <p className="text-slate-500">500 x 500 px</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 aspect-video">
            <GeneratedImage 
              prompt="A designer's mood board with fabric swatches, paint chips in rust and navy, and elegant typography sketches, photorealistic, shallow depth of field" 
              alt="Brand Guidelines" 
            />
          </div>
        </>
      )
    },
    {
      title: "The Lesson Preview",
      content: (
        <>
          <div className="w-1/3 aspect-[9/19] relative">
             <div className="absolute inset-0 bg-[#161C27] rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-[#F7EDE6] w-full h-full rounded-[2rem] overflow-hidden p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[8px] font-bold text-[#161C27]">INSIGHT THRIVE</span>
                    <div className="w-4 h-4 rounded-full bg-rust/20"></div>
                  </div>
                  <h4 className="font-serif text-lg mb-2">Why teens act like aliens</h4>
                  <div className="w-full h-24 bg-white rounded-lg mb-4 flex items-center justify-center">
                    <ImageIcon className="text-rust/20" />
                  </div>
                  <div className="space-y-2 opacity-60">
                    <div className="h-2 bg-slate-300 rounded w-full"></div>
                    <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                  </div>
                  <div className="mt-auto bg-rust text-white text-[10px] py-2 text-center rounded-md font-bold uppercase tracking-widest shadow-lg shadow-rust/20">
                    Continue Lesson
                  </div>
                </div>
             </div>
          </div>
          <div className="w-2/3 space-y-8 pl-8">
            <div className="grid grid-cols-2 gap-8 font-sans">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rust/10 flex items-center justify-center text-rust"><Smartphone size={16}/></div>
                  <h3 className="font-bold text-sm">Navigation Flow</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">The List View layout ensures users can track progress intuitively. Max title: 60 chars. Max summary: 70 chars.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rust/10 flex items-center justify-center text-rust"><ImageIcon size={16}/></div>
                  <h3 className="font-bold text-sm">Visual Cues</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Featured images provide instant context for the lesson content, optimized for mobile viewing.</p>
              </div>
            </div>
            <GeneratedImage 
              prompt="A close up shot of a hand scrolling through a high-end educational app on a sleek smartphone, natural soft lighting, aesthetic background" 
              alt="Mobile Interface" 
            />
          </div>
        </>
      )
    },
    {
      title: "Standard Lesson Architecture",
      content: (
        <>
          <div className="w-1/2 space-y-4">
            <p className="text-slate-600 mb-6 font-serif">Internal components must follow this specific order to ensure navigational consistency.</p>
            {[
              { label: "Objective", type: "Text Widget", emoji: "🎯" },
              { label: "Main Content", type: "Video Widget", emoji: "🎬" },
              { label: "Deep Dive", type: "Text Widget", emoji: "📝" },
              { label: "Mobile Context", type: "Audio Widget", emoji: "🎧" }
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-rust/10 group transition-all hover:translate-x-2">
                <span className="text-2xl">{step.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{step.label}</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{step.type}</p>
                </div>
                <div className="w-6 h-6 rounded-full border border-rust/20 flex items-center justify-center text-[10px] font-bold text-rust group-hover:bg-rust group-hover:text-white">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/2 h-full py-12">
             <GeneratedImage 
               prompt="A series of clean, minimalist floating glass cards in an organized sequence, depth of field, studio lighting, professional aesthetic" 
               alt="Structural Flow" 
             />
          </div>
        </>
      )
    },
    {
      title: "Engagement & Retention",
      content: (
        <>
          <div className="w-1/2 relative h-full flex items-center">
            <GeneratedImage 
               prompt="A serene lifestyle photo of a parent and a teenager sitting together in a sunlit living room having a meaningful conversation, cinematic, photorealistic" 
               alt="Impact" 
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-8 rounded-2xl shadow-2xl border border-rust/10 max-w-xs">
              <Quote className="text-rust mb-4" size={32} />
              <p className="font-serif italic text-slate-800 text-lg">"You're not crazy—your teen's brain is just under construction."</p>
            </div>
          </div>
          <div className="w-1/2 pl-12 space-y-8">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="text-rust mt-1" size={20} />
                <div>
                  <h4 className="font-bold font-sans">Active Learning</h4>
                  <p className="text-sm text-slate-600">PDF worksheets and check-ins transform passive watchers into active learners.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="text-rust mt-1" size={20} />
                <div>
                  <h4 className="font-bold font-sans">Retention Checks</h4>
                  <p className="text-sm text-slate-600">The Question Widget creates mandatory reflection points and parent journals.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="text-rust mt-1" size={20} />
                <div>
                  <h4 className="font-bold font-sans">Alternative Consumption</h4>
                  <p className="text-sm text-slate-600">HeyGen generated audio ensures busy parents can engage even while commuting.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      title: "Creator's Final Checklist",
      content: (
        <div className="w-full grid grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-slate-800">Final Validation Protocol</h3>
            <ul className="space-y-4">
              {[
                "Featured Image: 500x500px (Lesson) / 1024x1024px (Course)",
                "Titles < 60 chars / Summaries < 70 chars",
                "Video & Audio files processed and uploaded",
                "PDFs attached via File Widget",
                "Quiz/Journal questions configured and validated"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-center p-4 bg-white/50 rounded-lg border border-rust/5 font-sans text-sm">
                   <div className="w-5 h-5 rounded-full bg-rust/20 flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full bg-rust"></div>
                   </div>
                   {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-video bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-white p-2">
            <GeneratedImage 
               prompt="A clean minimalist checkmark icon on a premium white paper background with professional office lighting" 
               alt="Done" 
            />
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="w-full h-screen bg-[#161C27] flex items-center justify-center p-8 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .bg-rust { background-color: #C8502C; }
        .text-rust { color: #C8502C; }
        .border-rust { border-color: #C8502C; }
      `}</style>

      <div className="w-full max-w-6xl aspect-[16/9] shadow-2xl relative group bg-white rounded-3xl overflow-hidden">
        <SlideContainer title={slides[currentSlide].title}>
          {slides[currentSlide].content}
        </SlideContainer>

        <div className="absolute inset-y-0 left-0 w-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prevSlide} className="p-3 bg-white/80 rounded-full shadow-lg text-rust hover:bg-rust hover:text-white transition-all">
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={nextSlide} className="p-3 bg-white/80 rounded-full shadow-lg text-rust hover:bg-rust hover:text-white transition-all">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-8 bg-rust' : 'w-2 bg-rust/20'}`}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Fallback Note (Mandatory as per instructions) */}
      <div className="fixed bottom-4 right-4 text-[10px] text-white/30 font-sans uppercase tracking-[0.2em] pointer-events-none">
        Powered by Nano Banana (Gemini 2.5 Flash Image Preview)
      </div>
    </div>
  );
};

export default App;