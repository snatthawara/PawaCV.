/**
 * PAPERY TACTILE CRAFT WEB APPLICATION
 * Personal Portfolio & Achievement Dossier
 * Natthawara Saeliab (นางสาวณัฐวรา แซ่เลียบ)
 * KMUTNB - Industrial Business and Human Resources Development
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initNavigation();
  initAchievementMatrix();
  initContactForm();
  initPrintAndActionButtons();
  initKpiCounters();
});

/* ==========================================================================
   1. SPLASH SCREEN LIFECYCLE (First Load & Refresh)
   ========================================================================== */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  const progressFill = document.getElementById('splash-progress-fill');
  const enterBtn = document.getElementById('btn-enter-dossier');

  if (!splash) return;

  let progress = 0;
  const duration = 1800; // 1.8 seconds smooth progress
  const intervalTime = 30;
  const increment = 100 / (duration / intervalTime);

  const timer = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      if (progressFill) progressFill.style.width = '100%';
      
      // Automatic smooth dismiss after brief pause
      setTimeout(() => {
        dismissSplash();
      }, 400);
    } else {
      if (progressFill) progressFill.style.width = `${progress}%`;
    }
  }, intervalTime);

  // Manual Enter Button
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      clearInterval(timer);
      dismissSplash();
    });
  }

  function dismissSplash() {
    splash.classList.add('hide');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 850);
  }
}

/* ==========================================================================
   2. NAVIGATION & SMOOTH SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const tabLinks = document.querySelectorAll('.nav-tab-link');
  const sections = document.querySelectorAll('.section-paper-dossier, #profile-hero');

  // Click handler
  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        tabLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Intersection Observer for scroll spy
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        tabLinks.forEach(link => {
          if (link.getAttribute('data-target') === currentId) {
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. DASHBOARD ACHIEVEMENT MATRIX (FILTERABLE)
   ========================================================================== */
const achievementData = [
  {
    id: 1,
    category: 'intl',
    year: '2025',
    title: 'IAESTE Internship Program ณ ประเทศตุรกี',
    org: 'Prota Software, Ankara / Istanbul, Türkiye',
    desc: 'การตลาดดิจิทัล การแปลบทความวิชาการภาษาอังกฤษ-ไทย และประสานงานลูกค้าชาวไทย',
    badge: 'International Scholar'
  },
  {
    id: 2,
    category: 'lead',
    year: '2024',
    title: 'ผู้แทนคณะพิธีเกียรติยศ IRAP ROBOT Team 2024',
    org: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ',
    desc: 'ปฏิบัติหน้าที่ในพิธีเชิดชูเกียรติทีมแชมป์โลกหุ่นยนต์กู้ภัย IRAP ROBOT',
    badge: 'Faculty Ambassador'
  },
  {
    id: 3,
    category: 'biz',
    year: '2025-2026',
    title: 'Marketing Intern (8-Month Program)',
    org: 'Sunergy Development Co., Ltd.',
    desc: 'วิเคราะห์ Business Model Canvas (BMC), SWOT Analysis และผลิตสื่อดิจิทัลคอนเทนต์',
    badge: 'Strategic Marketing'
  },
  {
    id: 4,
    category: 'intl',
    year: '2024',
    title: 'MCUT Language & Culture Camp',
    org: 'Ming Chi University of Technology, ประเทศไต้หวัน',
    desc: 'โครงการแลกเปลี่ยนภาษา วัฒนธรรม และการเสริมสร้างมุมมองธุรกิจในภูมิภาคเอเชีย',
    badge: 'Global Exchange'
  },
  {
    id: 5,
    category: 'lead',
    year: '2024',
    title: 'KUMTNB Leadership Camp: Global Citizens',
    org: 'มจพ. (KMUTNB)',
    desc: 'การพัฒนาทักษะแห่งศตวรรษที่ 21 ภาวะผู้นำ และการคิดเชิงออกแบบ (Design Thinking)',
    badge: '21st Century Skills'
  },
  {
    id: 6,
    category: 'lead',
    year: '2023',
    title: 'Faculty Student Union Member',
    org: 'สโมสรนักศึกษา คณะบริหารธุรกิจและอุตสาหกรรมบริการ',
    desc: 'ร่วมจัดโครงการพัฒนานักศึกษา กิจกรรมค่าย และดูแลสิทธิประโยชน์นักศึกษา',
    badge: 'Student Union'
  },
  {
    id: 7,
    category: 'lead',
    year: '2022',
    title: 'Associate Student Council Member',
    org: 'สภานักศึกษา มจพ.',
    desc: 'ร่วมตรวจสอบและสนับสนุนกิจกรรมองค์กรนักศึกษาระดับมหาวิทยาลัย',
    badge: 'Student Council'
  },
  {
    id: 8,
    category: 'biz',
    year: '2023',
    title: 'Kumon Teacher Assistant',
    org: 'Kumon Learning Center (3 Months)',
    desc: 'แนะนำทักษะการเรียนรู้คณิตศาสตร์และภาษา เสริมสร้างวินัยการเรียนรู้แบบพึ่งตนเอง',
    badge: 'Academic Coach'
  },
  {
    id: 9,
    category: 'research',
    year: '2025',
    title: 'บทความวิจัย: Business Model Canvas & Digital Marketing',
    org: 'วารสารและการประชุมวิชาการบริหารธุรกิจ',
    desc: 'การวิจัยกลยุทธ์การตลาดและการสร้างโมเดลธุรกิจบริการยุคใหม่',
    badge: 'Research Paper'
  },
  {
    id: 10,
    category: 'research',
    year: '2025',
    title: 'บทความวิจัย: การพัฒนาสมรรถนะศตวรรษที่ 21 ผ่านทุน IAESTE',
    org: 'การประชุมวิชาการการศึกษาระดับนานาชาติ',
    desc: 'การศึกษาเชิงประจักษ์เรื่องผลลัพธ์การฝึกงานต่างประเทศและการสื่อสารข้ามวัฒนธรรม',
    badge: 'Research Paper'
  },
  {
    id: 11,
    category: 'research',
    year: '2024',
    title: 'บทความวิจัย: HRD Strategy for Digital Transformation',
    org: 'สาขาวิชาการบริหารธุรกิจอุตสาหกรรมและการพัฒนาทรัพยากรมนุษย์',
    desc: 'การ Upskill & Reskill บุคลากรเพื่อรองรับเทคโนโลยีอัจฉริยะในอุตสาหกรรม',
    badge: 'Academic Article'
  },
  {
    id: 12,
    category: 'lead',
    year: '2025',
    title: 'วิทยากรบรรยายพิเศษ: ทุน IAESTE ตุรกีสู่สากล',
    org: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ',
    desc: 'แนะแนวเส้นทางชิงทุนระดับโลกและการเตรียมตัวสู่อาชีพสากลแก่นักศึกษา',
    badge: 'Keynote Speaker'
  }
];

function initAchievementMatrix() {
  const container = document.getElementById('matrix-items-grid');
  const filterBtns = document.querySelectorAll('#filter-pills-list .filter-btn');

  if (!container) return;

  function renderMatrix(filter) {
    container.innerHTML = '';
    const filtered = filter === 'all' 
      ? achievementData 
      : achievementData.filter(item => item.category === filter);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'matrix-item-card';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <span style="font-size: 0.75rem; font-family: var(--font-thai-display); font-weight: 700; color: var(--wax-red); text-transform: uppercase;">
            ${item.badge}
          </span>
          <span style="font-family: var(--font-serif-title); font-size: 0.85rem; font-weight: 700; color: var(--ink-muted);">
            ${item.year}
          </span>
        </div>
        <h4 style="font-family: var(--font-serif-title); font-size: 1.08rem; font-weight: 700; color: var(--ink-primary); line-height: 1.3; margin-bottom: 4px;">
          ${item.title}
        </h4>
        <div style="font-size: 0.82rem; color: var(--kraft-brown); font-weight: 500; margin-bottom: 8px;">
          ${item.org}
        </div>
        <p style="font-size: 0.82rem; color: var(--ink-secondary); line-height: 1.5;">
          ${item.desc}
        </p>
      `;
      container.appendChild(card);
    });
  }

  // Initial render
  renderMatrix('all');

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderMatrix(filter);
    });
  });
}

/* ==========================================================================
   4. RESEARCH ARTICLE ABSTRACT MODAL
   ========================================================================== */
const abstractDatabase = {
  paper1: {
    title: 'การประยุกต์ใช้โมเดลธุรกิจ (BMC) และกลยุทธ์การตลาดดิจิทัลในการยกระดับขีดความสามารถการแข่งขันของธุรกิจบริการยุคหลังการแพร่ระบาด',
    authors: 'ณัฐวรา แซ่เลียบ และคณะ (พ.ศ. 2568)',
    journal: 'วารสารการบริหารธุรกิจและนวัตกรรมบริการ มจพ. (KMUTNB Academic Journal)',
    doi: '10.14416/kmutnb.biz.2025.04.012',
    abstract: `การศึกษาค้นคว้าอิสระฉบับนี้มีวัตถุประสงค์เพื่อวิเคราะห์แนวทางการนำเครื่องมือ Business Model Canvas (BMC) ร่วมกับกระบวนการวิเคราะห์สภาพแวดล้อมทางธุรกิจ (SWOT Analysis) และกลยุทธ์การตลาดดิจิทัลเชิงเนื้อหา (Digital Content Marketing) มาประยุกต์ใช้ในธุรกิจบริการและร้านอาหารในประเทศไทย\n\nผลการศึกษาจากกรณีศึกษาจริงพบว่า การกำหนดคุณค่าที่ส่งมอบ (Value Propositions) ที่ชัดเจนควบคู่กับการใช้สื่อมัลติมีเดีย (วิดีโอสั้นและกราฟิก) ผ่านแพลตฟอร์มโซเชียลมีเดีย สามารถเพิ่มการรับรู้แบรนด์ (Brand Awareness) และสร้างการมีส่วนร่วมของลูกค้า (Customer Engagement) เพิ่มขึ้นอย่างมีนัยสำคัญ อีกทั้งยังช่วยให้ผู้ประกอบการสามารถบริหารจัดการต้นทุนและช่องทางการจัดจำหน่ายได้อย่างมีประสิทธิภาพยิ่งขึ้น`,
    keywords: ['Business Model Canvas', 'SWOT Analysis', 'Digital Marketing', 'Customer Engagement', 'Hospitality Business']
  },
  paper2: {
    title: 'การพัฒนาสมรรถนะศตวรรษที่ 21 ของนักศึกษาผ่านการเรียนรู้จากประสบการณ์จริงในโครงการแลกเปลี่ยนและฝึกงานนานาชาติ: กรณีศึกษาทุน IAESTE ตุรกี',
    authors: 'ณัฐวรา แซ่เลียบ (พ.ศ. 2568)',
    journal: 'เอกสารการประชุมวิชาการระดับชาติด้านการศึกษาสากลและการพัฒนามนุษย์',
    doi: '10.14416/iaeste.th.conf.2025.07',
    abstract: `บทความนี้นำเสนอกระบวนการเรียนรู้จากประสบการณ์ตรง (Experiential Learning Theory) ของนักศึกษาไทยที่ได้รับคัดเลือกเข้าร่วมโครงการฝึกงานระดับนานาชาติ IAESTE ณ บริษัท Prota Software ประเทศตุรกี โดยมุ่งเน้นการถอดบทเรียนทักษะแห่งศตวรรษที่ 21\n\nผลการวิจัยสะท้อนให้เห็นว่า การปฏิบัติหน้าที่ในสภาพแวดล้อมสากลและการทำงานด้านการตลาดดิจิทัลข้ามพรมแดน ได้ส่งเสริมให้นักศึกษามีพัฒนาการเด่นชัดใน 4 ด้านสำคัญ ได้แก่: 1) ความฉลาดทางวัฒนธรรม (Cultural Intelligence - CQ) 2) ทักษะการแก้ปัญหาเฉพาะหน้าในการสื่อสารเชิงเทคนิค 3) ทักษะการแปลและปรับบริบทภาษาอังกฤษสู่ภาษาไทยเชิงธุรกิจ และ 4) ความเป็นอิสระและความมั่นใจในตนเอง ซึ่งเป็นคุณลักษณะสำคัญยิ่งของแรงงานคุณภาพในยุคโลกาภิวัตน์`,
    keywords: ['IAESTE Thailand', '21st Century Skills', 'Experiential Learning', 'Global Mindset', 'Cross-Cultural Communication']
  },
  paper3: {
    title: 'กลยุทธ์การบริหารและการพัฒนาทรัพยากรมนุษย์เพื่อรองรับการเปลี่ยนผ่านทางเทคโนโลยีในภาคธุรกิจอุตสาหกรรมไทย',
    authors: 'ณัฐวรา แซ่เลียบ และคณะ (พ.ศ. 2567)',
    journal: 'รายงานการศึกษาค้นคว้าอิสระ สาขาการบริหารธุรกิจอุตสาหกรรมและการพัฒนาทรัพยากรมนุษย์ มจพ.',
    doi: '10.14416/hrd.ind.kmutnb.2024.11',
    abstract: `งานวิจัยนี้มุ่งเน้นศึกษาทิศทางการปรับตัวของแผนกทรัพยากรมนุษย์ (HRD) ในสถานประกอบการภาคอุตสาหกรรมของไทย เพื่อรองรับการเข้ามาของระบบอัตโนมัติและปัญญาประดิษฐ์ (AI)\n\nข้อค้นพบระบุว่า องค์กรที่ประสบความสำเร็จในการเปลี่ยนผ่าน คือองค์กรที่มีนโยบายการ Re-skilling และ Up-skilling ที่ต่อเนื่อง โดยให้ความสำคัญกับทั้งทักษะความรู้ด้านดิจิทัล (Hard Skills) ควบคู่กับทักษะด้านมนุษย์ เช่น การคิดเชิงวิพากษ์ (Critical Thinking) และการปรับตัวอย่างยืดหยุ่น (Adaptability)`,
    keywords: ['Human Resources Development (HRD)', 'Upskilling & Reskilling', 'Digital Transformation', 'Industrial Business']
  }
};

window.openAbstractModal = function(paperId) {
  const modal = document.getElementById('abstract-modal');
  const target = document.getElementById('modal-content-target');
  const data = abstractDatabase[paperId];

  if (!modal || !target || !data) return;

  target.innerHTML = `
    <div style="margin-bottom: 16px;">
      <span style="font-family: 'Courier New', monospace; font-size: 0.8rem; font-weight: 700; color: var(--stamp-blue); background: var(--stamp-blue-soft); padding: 3px 8px; border: 1px solid var(--stamp-blue); border-radius: 2px;">
        DOI: ${data.doi}
      </span>
      <div style="font-size: 0.85rem; color: var(--kraft-brown); margin-top: 8px; font-weight: 600;">
        ${data.journal}
      </div>
    </div>

    <h2 style="font-family: var(--font-serif-title); font-size: 1.45rem; font-weight: 700; color: var(--ink-primary); line-height: 1.35; margin-bottom: 12px;">
      ${data.title}
    </h2>

    <div style="font-size: 0.95rem; color: var(--wax-red); font-weight: 600; margin-bottom: 20px;">
      ${data.authors}
    </div>

    <div style="border-top: 1px dashed var(--border-ticket); border-bottom: 1px dashed var(--border-ticket); padding: 20px 0; margin-bottom: 20px;">
      <h3 style="font-family: var(--font-thai-display); font-size: 1rem; font-weight: 700; color: var(--ink-primary); margin-bottom: 10px;">
        บทคัดย่อ (Abstract):
      </h3>
      <p style="font-size: 0.95rem; color: var(--ink-secondary); line-height: 1.75; white-space: pre-line;">
        ${data.abstract}
      </p>
    </div>

    <div>
      <div style="font-size: 0.85rem; font-weight: 600; color: var(--ink-muted); margin-bottom: 8px;">
        คำสำคัญ (Keywords):
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${data.keywords.map(kw => `<span class="keyword-badge">#${kw}</span>`).join('')}
      </div>
    </div>

    <div style="margin-top: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
      <a href="resume.pdf" target="_blank" class="btn-kraft-primary">
        <span>📥</span>
        <span>ดาวน์โหลดเอกสารอ้างอิงฉบับเต็ม</span>
      </a>
      <button type="button" class="btn-kraft-secondary" onclick="closeAbstractModal()">
        <span>ปิดหน้าต่าง</span>
      </button>
    </div>
  `;

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeAbstractModal = function() {
  const modal = document.getElementById('abstract-modal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

// Close modal on click backdrop or escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAbstractModal();
});

const abstractModal = document.getElementById('abstract-modal');
if (abstractModal) {
  abstractModal.addEventListener('click', (e) => {
    if (e.target === abstractModal) closeAbstractModal();
  });
}

/* ==========================================================================
   5. CONTACT POSTCARD FORM WITH TACTILE RECEIPT CONFIRMATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-postcard-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value || 'ผู้ติดต่อ';
    const email = document.getElementById('contact-email')?.value || '';
    const subject = document.getElementById('contact-subject')?.value || '';

    // Show toast notification
    showToast(`ประทับตราจดหมายและส่งข้อความจาก "${name}" ถึงคุณณัฐวรา แซ่เลียบ เรียบร้อยแล้ว 📮`);

    // Reset form
    form.reset();
  });
}

function showToast(message) {
  const toast = document.getElementById('craft-toast');
  const toastMsg = document.getElementById('toast-message');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

/* ==========================================================================
   6. PRINT AND ACTION BUTTONS
   ========================================================================== */
function initPrintAndActionButtons() {
  const printBtn = document.getElementById('btn-print-portfolio');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   7. KPI COUNTER SMOOTH ANIMATION
   ========================================================================== */
function initKpiCounters() {
  const counters = [
    { id: 'kpi-total-achieve', target: 18, isFloat: false },
    { id: 'kpi-intl-programs', target: 2, isFloat: false },
    { id: 'kpi-gpax', target: 3.14, isFloat: true },
    { id: 'kpi-research-count', target: 3, isFloat: false },
    { id: 'kpi-speaker-count', target: 4, isFloat: false }
  ];

  let animated = false;
  const dashboardSection = document.getElementById('section-dashboard');

  if (!dashboardSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      counters.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;

        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out quad
          const easeProgress = 1 - (1 - progress) * (1 - progress);
          const currentVal = easeProgress * item.target;

          if (item.isFloat) {
            el.textContent = currentVal.toFixed(2);
          } else {
            el.textContent = Math.floor(currentVal);
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = item.isFloat ? item.target.toFixed(2) : item.target;
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }
  }, { threshold: 0.2 });

  observer.observe(dashboardSection);
}
