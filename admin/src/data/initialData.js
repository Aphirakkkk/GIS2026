import { initialAboutSections } from './aboutSectionsData';
import { initialBusinessData } from './businessDivisionsData';
import { initialProductsServicesData } from './productsServicesData';
import { initialProjectsReferenceData } from './projectsReferenceData';
import { initialNewsEventsData } from './newsEventsData';
import { initialCareerData } from './careerData';
import { initialContactFooterData } from './contactFooterData';

export const initialData = {
  // Statistics for Dashboard Cards
  stats: {
    bannerCount: 5,
    newsCount: 22,
    projectsCount: 94,
    servicesCount: 4,
    jobsCount: 2,
    inquiriesCount: 23,
    adminsCount: 2
  },

  // Recent Inquiries for Dashboard Table
  recentInquiries: [
    {
      id: 1,
      name: "Thanakorn Vorraratchaikul",
      contact: "0972438581",
      email: "thanakorn.v@gmail.com",
      subject: "ขอใบเสนอราคาติดตั้งระบบ M&E โรงงาน",
      date: "04/06/2026",
      status: "pending"
    },
    {
      id: 2,
      name: "wittaya Kaewburom",
      contact: "0648468830",
      email: "wittaya.k@company.co.th",
      subject: "สนใจระบบปรับอากาศคลีนรูม Class 10,000",
      date: "04/06/2026",
      status: "contacted"
    },
    {
      id: 3,
      name: "rafaela.jiang",
      contact: "rafaela.jiang@jldynamics.com",
      email: "rafaela.jiang@jldynamics.com",
      subject: "Data Center Cooling Solution Inquiry",
      date: "21/11/2025",
      status: "completed"
    },
    {
      id: 4,
      name: "Amelia Chen",
      contact: "+61 3 8701 180",
      email: "amelia.c@au-tech.com",
      subject: "Regional MEP Partnership Discussion",
      date: "14/11/2025",
      status: "completed"
    }
  ],

  // Careers / Job Openings
  jobs: [
    {
      id: 1,
      title: "Senior MEP Project Engineer",
      department: "Engineering",
      location: "Bangkok & Rayong",
      type: "Full-time",
      active: true
    },
    {
      id: 2,
      title: "HVAC & Cleanroom Specialist",
      department: "Technical Services",
      location: "Bangkok",
      type: "Full-time",
      active: true
    }
  ],

  // Content for Website (Multi-language TH & EN)
  content: {
    th: {
      siteInfo: {
        siteName: "GIS GROUP",
        companyFullName: "กลุ่มบริษัท จีไอเอส กรุ๊ป จำกัด (GIS GROUP)",
        logoUrl: "https://gisgroup.co.th/images/logo.png",
        phone: "02-123-4567, 02-987-6543",
        email: "info@gisgroup.co.th, contact@gisgroup.co.th",
        address: "เลขที่ 88/9 อาคาร จีไอเอส ทาวเวอร์ ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310",
        workingHours: "จันทร์ - ศุกร์: 08:30 - 17:30 น. (ฝ่ายบริการฉุกเฉิน 24 ชั่วโมง)",
        facebook: "https://facebook.com/gisgroupthailand",
        linkedin: "https://linkedin.com/company/gis-group",
        line: "@gisgroup"
      },
      hero: {
        tagline: "LEADING ENGINEERING & MEP CONTRACTOR",
        titleMain: "LOCAL EXPERTISE'S",
        titleSub: "INTERNATIONAL STANDARD",
        description: "ผู้นำด้านวิศวกรรมระบบประกอบอาคารและอุตสาหกรรมครบวงจร มุ่งมั่นสู่ความเป็นเลิศด้วยมาตรฐานระดับสากลและความปลอดภัยสูงสุด",
        btnAbout: "ABOUT GIS GROUP",
        btnContact: "CONTACT",
        bgImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?q=80&w=1600&auto=format&fit=crop",
        stats: [
          { id: 1, value: "25+", label: "ปีแห่งความเชี่ยวชาญ" },
          { id: 2, value: "500+", label: "โครงการที่สำเร็จ" },
          { id: 3, value: "150+", label: "วิศวกรและผู้ชำนาญการ" },
          { id: 4, value: "100%", label: "มาตรฐานความปลอดภัย" }
        ]
      },
      banners: [
        {
          id: 1,
          title: "วิศวกรรมระบบประกอบอาคารชั้นนำระดับสากล",
          subtitle: "MEP & Industrial Engineering Contractor",
          image: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 1
        },
        {
          id: 2,
          title: "ระบบปรับอากาศและห้องปลอดเชื้อ Cleanroom Class 100-100,000",
          subtitle: "HVAC, Chiller Plant & Cleanroom Standards",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 2
        },
        {
          id: 3,
          title: "นวัตกรรมบริหารจัดการพลังงานอัจฉริยะ (BMS / AI Optimization)",
          subtitle: "Building Energy Efficiency Solutions",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 3
        },
        {
          id: 4,
          title: "มาตรฐานความปลอดภัยระดับสูงสุด Zero Accident Award",
          subtitle: "ISO 9001, ISO 14001, ISO 45001",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 4
        },
        {
          id: 5,
          title: "ฉลองครบรอบ 25 ปีแห่งความเชี่ยวชาญด้านวิศวกรรม",
          subtitle: "Partner of Choice for Engineering Excellence",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 5
        }
      ],
      values: {
        watermark: "VALUES",
        titleTop: "VALUES",
        titleBottom: "STATEMENT",
        subtitle: "ค่านิยมหลักที่ขับเคลื่อนองค์กรและสร้างความเชื่อมั่นแก่พันธมิตรทุกระดับ",
        cards: [
          {
            id: "G",
            letter: "G",
            theme: "light",
            title1: "GOOD",
            title2: "GOVERNANCE",
            desc: "ดำเนินงานด้วยยึดหลักธรรมาภิบาล",
            detail: "ยึดมั่นในความโปร่งใส ตรวจสอบได้ จริยธรรมทางธุรกิจ และความรับผิดชอบต่อสังคมและสิ่งแวดล้อม",
            icon: "ShieldCheck"
          },
          {
            id: "I",
            letter: "I",
            theme: "dark",
            title1: "INNOVATION",
            title2: "",
            desc: "สร้างสรรค์นวัตกรรม",
            detail: "พัฒนาระบบและเทคโนโลยีวิศวกรรมสมัยใหม่ เพิ่มประสิทธิภาพ ประหยัดพลังงาน และตอบโจทย์อนาคต",
            icon: "Lightbulb"
          },
          {
            id: "S",
            letter: "S",
            theme: "light",
            title1: "SYNERGY",
            title2: "",
            desc: "ร่วมกันสร้างพลังอันยิ่งใหญ่",
            detail: "ผนึกกำลังระหว่างทีมงาน ลูกค้า และพันธมิตร เพื่อส่งมอบผลงานที่เหนือความคาดหมายอย่างยั่งยืน",
            icon: "Users"
          }
        ]
      },
      aboutSections: initialAboutSections,
      about: {
        tag: "ABOUT US",
        title: "ความเป็นเลิศด้านวิศวกรรม ที่คุณไว้วางใจได้",
        desc1: "กลุ่มบริษัท GIS GROUP เป็นผู้ให้บริการด้านวิศวกรรมระบบประกอบอาคาร (MEP Engineering Contractor) และระบบโรงงานอุตสาหกรรมชั้นนำในประเทศไทยและภูมิภาคอาเซียน ด้วยประสบการณ์ยาวนานกว่า 25 ปี",
        desc2: "เราพร้อมส่งมอบบริการตั้งแต่การออกแบบระบบ (Engineering Design), การจัดหาและติดตั้ง (Procurement & Installation), การทดสอบระบบ (Testing & Commissioning) ตลอดจนการบำรุงรักษาอย่างครบวงจร ภายใต้มาตรฐานสากล ISO 9001, ISO 14001 และ ISO 45001",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
        highlights: [
          { id: 1, title: "วิศวกรมืออาชีพ", desc: "ทีมงานได้รับใบอนุญาตระดับวุฒิวิศวกรและสามัญวิศวกร" },
          { id: 2, title: "มาตรฐานสากล", desc: "รับรองด้วย ISO 9001:2015, ISO 14001:2015 และ ISO 45001:2018" },
          { id: 3, title: "ตรงต่อเวลาและงบประมาณ", desc: "บริหารจัดการโครงการด้วยระบบ BIM และเทคโนโลยีดิจิทัลที่แม่นยำ" },
          { id: 4, title: "ความปลอดภัยระดับสูงสุด", desc: "สถิติ Zero Accident ตลอดการปฏิบัติงานในพื้นที่โครงการ" }
        ],
        certificationsTitle: "มาตรฐานการรับรองระดับสากล",
        certs: [
          { id: 1, name: "ISO 9001:2015", desc: "ระบบบริหารงานคุณภาพ (Quality Management System)" },
          { id: 2, name: "ISO 14001:2015", desc: "ระบบการจัดการสิ่งแวดล้อม (Environmental Management)" },
          { id: 3, name: "ISO 45001:2018", desc: "ระบบการจัดการอาชีวอนามัยและความปลอดภัย (Health & Safety)" },
          { id: 4, name: "Green Building Standard", desc: "มาตรฐานอาคารเขียว LEED & TREES Certified Engineering" }
        ]
      },
      businessData: initialBusinessData,
      productsServicesData: initialProductsServicesData,
      projectsReferenceData: initialProjectsReferenceData,
      newsEventsData: initialNewsEventsData,
      careerData: initialCareerData,
      contactFooterData: initialContactFooterData,
      services: [
        {
          id: "me",
          category: "ระบบไฟฟ้าและสื่อสาร",
          title: "Mechanical & Electrical Systems (M&E)",
          thTitle: "ระบบวิศวกรรมไฟฟ้าและเครื่องกล",
          shortDesc: "ติดตั้งระบบไฟฟ้าแรงสูง-แรงต่ำ หม้อแปลง ตู้สวิตช์บอร์ด MDB เครื่องกำเนิดไฟฟ้าสำรอง และระบบความปลอดภัยอัจฉริยะ",
          image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
          features: [
            "High Voltage & Low Voltage Substation (115kV / 22kV)",
            "Main Distribution Board (MDB) & Switchgear",
            "Emergency Backup Generator & UPS Systems",
            "Smart Lighting Control & Energy Metering",
            "Lightning Protection & Grounding System"
          ]
        },
        {
          id: "hvac",
          category: "ระบบปรับอากาศและระบายอากาศ",
          title: "HVAC & Cleanroom Engineering",
          thTitle: "ระบบปรับอากาศและคลีนรูมควบคุมพิเศษ",
          shortDesc: "ออกแบบและติดตั้งระบบทำความเย็น Chiller Plant, ท่อส่งลม Ductwork และห้องปลอดเชื้อ Cleanroom Class 100 - 100,000",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
          features: [
            "Central Chiller Plant & Cooling Tower Installation",
            "Air Handling Unit (AHU) & Fan Coil Unit (FCU)",
            "Precision Air Conditioning (PAC) for Data Centers",
            "Cleanroom System ISO Class 1 to 8 (GMP / FDA Standard)",
            "Ventilation & Smoke Extraction System"
          ]
        },
        {
          id: "piping",
          category: "ระบบท่อและสุขาภิบาล",
          title: "Industrial Piping & Fire Protection",
          thTitle: "ระบบท่ออุตสาหกรรมและดับเพลิงอัตโนมัติ",
          shortDesc: "ระบบท่อน้ำหล่อเย็น ท่อไอน้ำ ท่อก๊าซอุตสาหกรรม และระบบดับเพลิงอัตโนมัติมาตรฐาน NFPA ครบวงจร",
          image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
          features: [
            "Industrial Process Piping (Steam, Chilled Water, Compressed Air)",
            "Automatic Fire Sprinkler & Fire Pump System (NFPA Standard)",
            "Clean Agent Fire Suppression (FM-200 / Novec 1230 / IG-541)",
            "Plumbing, Drainage & Wastewater Treatment System",
            "Fuel & Chemical Storage Distribution Piping"
          ]
        },
        {
          id: "automation",
          category: "ระบบอัตโนมัติ",
          title: "Building Automation & Energy Management (BAS/BEMS)",
          thTitle: "ระบบบริหารจัดการอาคารอัตโนมัติและพลังงาน",
          shortDesc: "เชื่อมต่อและควบคุมอุปกรณ์ทั้งอาคารผ่านระบบ IoT และ AI ช่วยลดการใช้พลังงานได้สูงสุดถึง 35%",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
          features: [
            "Building Management System (BMS / BAS)",
            "Building Energy Management System (BEMS & AI Optimization)",
            "SCADA & Industrial IoT Monitoring",
            "CCTV, Access Control & Public Address System",
            "24/7 Predictive Maintenance & Remote Operations Center"
          ]
        }
      ],
      projects: [
        {
          id: 1,
          title: "Mega Industrial Plant & Cleanroom",
          category: "โรงงานอุตสาหกรรม",
          location: "Eastern Seaboard, Rayong",
          scope: "Complete MEP, HVAC Chiller Plant & Cleanroom Class 1,000",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
        },
        {
          id: 2,
          title: "Tier IV Hyperscale Data Center",
          category: "ดาต้าเซ็นเตอร์",
          location: "Bangkok Metropolitan Area",
          scope: "High Voltage Dual Substation, Precision Cooling & Fire Suppression",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop"
        },
        {
          id: 3,
          title: "Premium Grade-A Smart Tower",
          category: "อาคารพาณิชย์และมิกซ์ยูส",
          location: "CBD Sukhumvit, Bangkok",
          scope: "Full Building Management System (BMS), Smart Lighting & HVAC",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
        },
        {
          id: 4,
          title: "Specialized Medical Complex",
          category: "โรงพยาบาลและเฮลธ์แคร์",
          location: "Nonthaburi",
          scope: "Negative Pressure Isolation Rooms, Medical Gas & Cleanroom HVAC",
          image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"
        }
      ],
      news: [
        {
          id: 1,
          title: "ทดสอบระบบและมาตรฐานวิศวกรรมยุคใหม่ 2026",
          date: "21/08/2026",
          excerpt: "การทดสอบระบบปฏิบัติการและมาตรฐานด้านวิศวกรรมความปลอดภัยประจำปี",
          image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop"
        },
        {
          id: 2,
          title: "ฉลองครบรอบ 24 ปี จีไอเอส กรุ๊ป ก้าวสู่ความสำเร็จอย่างยั่งยืน",
          date: "15/02/2024",
          excerpt: "ตอกย้ำความเป็นเลิศด้าน MEP Engineering พร้อมเดินหน้าขยายงานระดับภูมิภาค",
          image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
        },
        {
          id: 3,
          title: "ร่วมสมทบทุน \"ปรับปรุงซ่อมแซมโรงอาหารโรงเรียนในชนบท\"",
          date: "24/03/2022",
          excerpt: "กิจกรรมเพื่อสังคม CSR ส่งเสริมสุขอนามัยและคุณภาพชีวิตของเยาวชน",
          image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"
        },
        {
          id: 4,
          title: "ร่วมสร้างอาคารเรียนและสนับสนุนอุปกรณ์กายภาพบำบัด",
          date: "17/03/2022",
          excerpt: "GIS GROUP มอบสิ่งปลูกสร้างเพื่อการเรียนรู้และฟื้นฟูสมรรถภาพของชุมชน",
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
        },
        {
          id: 5,
          title: "ร่วมบริจาคอุปกรณ์ทางการศึกษาให้กับนักศึกษาคณะวิศวกรรมศาสตร์",
          date: "17/03/2022",
          excerpt: "สนับสนุนเยาวชนรุ่นใหม่สู่วิชาชีพวิศวกรเพื่อร่วมพัฒนาโครงสร้างพื้นฐานของประเทศ",
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    en: {
      siteInfo: {
        siteName: "GIS GROUP",
        companyFullName: "GIS GROUP Company Limited",
        logoUrl: "https://gisgroup.co.th/images/logo.png",
        phone: "+66 2-123-4567, +66 2-987-6543",
        email: "info@gisgroup.co.th, contact@gisgroup.co.th",
        address: "88/9 GIS Tower, Rama 9 Road, Huai Khwang, Bangkok 10310 Thailand",
        workingHours: "Mon - Fri: 08:30 - 17:30 (24/7 Emergency Support)",
        facebook: "https://facebook.com/gisgroupthailand",
        linkedin: "https://linkedin.com/company/gis-group",
        line: "@gisgroup"
      },
      hero: {
        tagline: "LEADING ENGINEERING & MEP CONTRACTOR",
        titleMain: "LOCAL EXPERTISE'S",
        titleSub: "INTERNATIONAL STANDARD",
        description: "Leading comprehensive MEP and industrial engineering contractor committed to engineering excellence, world-class safety, and sustainability.",
        btnAbout: "ABOUT GIS GROUP",
        btnContact: "CONTACT",
        bgImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?q=80&w=1600&auto=format&fit=crop",
        stats: [
          { id: 1, value: "25+", label: "Years Experience" },
          { id: 2, value: "500+", label: "Completed Projects" },
          { id: 3, value: "150+", label: "Expert Engineers" },
          { id: 4, value: "100%", label: "Safety Standard" }
        ]
      },
      banners: [
        {
          id: 1,
          title: "Leading MEP & Industrial Engineering Contractor",
          subtitle: "International Standards & High-Tech Delivery",
          image: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 1
        },
        {
          id: 2,
          title: "Advanced Cleanroom & HVAC Engineering",
          subtitle: "ISO Class 1-8 for High-Tech Industries",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 2
        },
        {
          id: 3,
          title: "Intelligent Building Management & Energy Optimization",
          subtitle: "BMS, BEMS, and Predictive IoT Operations",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 3
        },
        {
          id: 4,
          title: "Zero Accident Safety Culture",
          subtitle: "Certified with ISO 9001, 14001, 45001",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 4
        },
        {
          id: 5,
          title: "Celebrating 25 Years of Engineering Excellence",
          subtitle: "Your Trusted Engineering Solutions Partner",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
          active: true,
          order: 5
        }
      ],
      values: {
        watermark: "VALUES",
        titleTop: "VALUES",
        titleBottom: "STATEMENT",
        subtitle: "Core beliefs driving our organization and creating trust with partners worldwide",
        cards: [
          {
            id: "G",
            letter: "G",
            theme: "light",
            title1: "GOOD",
            title2: "GOVERNANCE",
            desc: "Upholding Integrity & Transparency",
            detail: "Unwavering commitment to ethical practices, transparency, regulatory compliance, and corporate social responsibility.",
            icon: "ShieldCheck"
          },
          {
            id: "I",
            letter: "I",
            theme: "dark",
            title1: "INNOVATION",
            title2: "",
            desc: "Engineering Future-Ready Solutions",
            detail: "Continuously adopting cutting-edge engineering technologies, energy efficiency, and digital construction methodologies.",
            icon: "Lightbulb"
          },
          {
            id: "S",
            letter: "S",
            theme: "light",
            title1: "SYNERGY",
            title2: "",
            desc: "Creating Greater Value Together",
            detail: "Fostering strong partnerships among our teams, clients, and subcontractors to deliver beyond expectations.",
            icon: "Users"
          }
        ]
      },
      aboutSections: initialAboutSections,
      about: {
        tag: "ABOUT US",
        title: "Engineering Excellence You Can Trust",
        desc1: "GIS GROUP is a leading Mechanical, Electrical, and Plumbing (MEP) contractor and industrial system specialist operating in Thailand and the ASEAN region for over 25 years.",
        desc2: "We deliver turnkey solutions from engineering design and procurement to installation, testing, commissioning, and round-the-clock maintenance.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
        highlights: [
          { id: 1, title: "Certified Professional Engineers", desc: "Licensed senior engineers and specialized project managers" },
          { id: 2, title: "Global ISO Certifications", desc: "Certified under ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018" },
          { id: 3, title: "On-Time & On-Budget Delivery", desc: "Precise execution backed by Building Information Modeling (BIM)" },
          { id: 4, title: "Uncompromising Safety Standards", desc: "Zero-accident track record across all project sites" }
        ],
        certificationsTitle: "International Quality & Safety Standards",
        certs: [
          { id: 1, name: "ISO 9001:2015", desc: "Quality Management System" },
          { id: 2, name: "ISO 14001:2015", desc: "Environmental Management System" },
          { id: 3, name: "ISO 45001:2018", desc: "Occupational Health and Safety Management" },
          { id: 4, name: "Green Building Standard", desc: "LEED & TREES Certified Building Engineering" }
        ]
      },
      businessData: initialBusinessData,
      productsServicesData: initialProductsServicesData,
      projectsReferenceData: initialProjectsReferenceData,
      newsEventsData: initialNewsEventsData,
      careerData: initialCareerData,
      contactFooterData: initialContactFooterData,
      services: [
        {
          id: "me",
          category: "Electrical & Communications",
          title: "Mechanical & Electrical Systems (M&E)",
          thTitle: "Mechanical & Electrical Engineering",
          shortDesc: "Comprehensive High Voltage/Low Voltage distribution, substation, transformers, MDB, and emergency generators.",
          image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
          features: [
            "High Voltage Substation (115kV / 22kV)",
            "Main Distribution Boards & Switchgear",
            "Emergency Generators & Industrial UPS",
            "Smart Lighting Controls & Metering",
            "Lightning Protection & Grounding"
          ]
        },
        {
          id: "hvac",
          category: "HVAC & Ventilation",
          title: "HVAC & Cleanroom Engineering",
          thTitle: "HVAC & Controlled Environments",
          shortDesc: "Chilled water plant systems, precision cooling for hyperscale data centers, and cleanroom environments.",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
          features: [
            "Central Chiller Plant & Cooling Towers",
            "Air Handling Units & Fan Coil Units",
            "Precision Air Conditioning (PAC)",
            "Cleanroom ISO Class 1 to 8",
            "Smoke Extraction & Ventilation"
          ]
        },
        {
          id: "piping",
          category: "Piping & Fire Protection",
          title: "Industrial Piping & Fire Protection",
          thTitle: "Process Piping & Fire Safety",
          shortDesc: "High-pressure industrial piping, steam systems, gas lines, and automatic NFPA-compliant fire suppression.",
          image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
          features: [
            "Industrial Process Piping (Steam, Water, Air)",
            "Automatic Fire Sprinklers & Pumps (NFPA)",
            "Clean Agent Suppression (FM-200 / Novec)",
            "Plumbing & Industrial Wastewater",
            "Chemical & Fuel Distribution"
          ]
        },
        {
          id: "automation",
          category: "Building Automation",
          title: "Building Automation & Energy Management (BAS/BEMS)",
          thTitle: "Smart Automation & Energy Efficiency",
          shortDesc: "IoT and AI-driven Building Automation Systems reducing building operational energy expenditure by up to 35%.",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
          features: [
            "Building Management Systems (BMS/BAS)",
            "BEMS & AI Optimization Engines",
            "Industrial SCADA & IoT Telemetry",
            "Access Control & Security Integration",
            "24/7 Predictive Remote Diagnostics"
          ]
        }
      ],
      projects: [
        {
          id: 1,
          title: "Mega Industrial Plant & Cleanroom",
          category: "Industrial Manufacturing",
          location: "Eastern Seaboard, Rayong",
          scope: "Complete MEP, HVAC Chiller Plant & Cleanroom Class 1,000",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
        },
        {
          id: 2,
          title: "Tier IV Hyperscale Data Center",
          category: "Data Center Infrastructure",
          location: "Bangkok Metropolitan Area",
          scope: "High Voltage Dual Substation, Precision Cooling & Fire Suppression",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop"
        },
        {
          id: 3,
          title: "Premium Grade-A Smart Tower",
          category: "Commercial & Mixed-Use",
          location: "CBD Sukhumvit, Bangkok",
          scope: "Full Building Management System (BMS), Smart Lighting & HVAC",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
        },
        {
          id: 4,
          title: "Specialized Medical Complex",
          category: "Healthcare & Hospitals",
          location: "Nonthaburi",
          scope: "Negative Pressure Isolation Rooms, Medical Gas & Cleanroom HVAC",
          image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"
        }
      ],
      news: [
        {
          id: 1,
          title: "Testing & Engineering Standards 2026",
          date: "21/08/2026",
          excerpt: "Annual engineering quality verification and safety standard audit.",
          image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop"
        },
        {
          id: 2,
          title: "Celebrating GIS GROUP 24th Anniversary",
          date: "15/02/2024",
          excerpt: "Solidifying our MEP engineering leadership and regional expansion.",
          image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
        },
        {
          id: 3,
          title: "CSR: School Cafeteria Renovation Project",
          date: "24/03/2022",
          excerpt: "Improving hygiene and educational environments for rural youth.",
          image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"
        },
        {
          id: 4,
          title: "Building Construction & Physical Therapy Equipment Donation",
          date: "17/03/2022",
          excerpt: "Supporting community healthcare rehabilitation facilities.",
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
        },
        {
          id: 5,
          title: "Engineering Education Equipment Contribution",
          date: "17/03/2022",
          excerpt: "Empowering university engineering students with modern equipment.",
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
        }
      ]
    }
  }
};
