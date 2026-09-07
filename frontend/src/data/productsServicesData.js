export const initialProductsServicesData = {
  header: "Products & Services",
  headerTh: "ผลิตภัณฑ์และบริการ",
  activeTabDefault: "products",

  // 1. Overview Banner Section (Screenshot 3)
  overview: {
    title: "PRODUCT & SERVICE",
    titleTh: "PRODUCT & SERVICE",
    subtitles: [
      "Energy Management",
      "Indoor Air Quality (IAQ)",
      "Retrofit - Renovation - Maintenance"
    ],
    subtitlesTh: [
      "การจัดการพลังงาน",
      "คุณภาพของอากาศภายในอาคาร",
      "การปรับปรุง - การดัดแปลง - การบำรุงรักษา"
    ],
    bullets: [
      "Energy Saving & Management Solutions",
      "Chiller Plant Installation & Retrofit",
      "Indoor Air Quality (IAQ) Solutions",
      "Power Quality Operational Solutions",
      "Preventive Maintenance for M&E Systems",
      "M&E System Renovations & Modifications",
      "Air Conditioning Maintenance Service Contract",
      "Central Monitoring & Inspection Service Center"
    ],
    bulletsTh: [
      "แนวทางการจัดการและการประหยัดพลังงาน",
      "การติดตั้งและปรับปรุงเครื่องทำน้ำเย็น",
      "แนวทางการจัดการคุณภาพอากาศภายในอาคาร",
      "แนวทางการดำเนินงานด้านคุณภาพกำลังไฟฟ้า",
      "การบำรุงรักษาเชิงป้องกันระบบงาน ระบบ",
      "การดัดแปลงแก้ไขเกี่ยวกับงานระบบ",
      "ข้อตกลงเกี่ยวกับการบำรุงรักษาเครื่องปรับอากาศ",
      "ศูนย์บริการการตรวจสอบส่วนกลาง"
    ],
    btnText: "Read More",
    btnTextTh: "อ่านเพิ่มเติม",
    btnLink: "#contact",
    bgImage: "/images/business-bg.jpg",
    engineersImage: "/images/products-overview-engineers.jpg"
  },

  // 2. Products Section (Screenshot 1)
  products: {
    title: "Products",
    titleTh: "Products",
    leftImage: "/images/products-chiller-piping.jpg",
    leftTitle: "Chiller Plant & Industrial Piping Systems",
    leftTitleTh: "ระบบชิลเลอร์และงานท่ออุตสาหกรรม",
    rightImage: "/images/products-fire-sprinkler.jpg",
    rightTitle: "Fire Alarm Sprinkler & Valve Stations",
    rightTitleTh: "ระบบดับเพลิง สปริงเกอร์และสถานีวาล์ว",
    categories: [
      { id: 1, name: "AIR Condition", brands: "Mitsubishi, samsung, LG, Carrier, Daikin, York, Trane, Fujitsu, Haier" },
      { id: 2, name: "Chiller Plant", brands: "York, Carrier, Trane, Daikin" },
      { id: 3, name: "Ventilation", brands: "Kruger, Panasonic, Wolters Kluwer" },
      { id: 4, name: "VRF", brands: "Mitsubishi, samsung, LG, Toshiba, Daikin, York, Trane, Fujitsu, Haier" },
      { id: 5, name: "AHU Clean Room", brands: "Robert Therm, LG, York, Carrier, Trane" },
      { id: 6, name: "Precision Air", brands: "Emerson" },
      { id: 7, name: "Video Surveillance", brands: "Honeywell, Johnson Control, Hikvision, Panasonic, Axis, Milestone" },
      { id: 8, name: "Access Control", brands: "Honeywell, Johnson Control, Hikvision" },
      { id: 9, name: "Intrusion Detection", brands: "Honeywell" },
      { id: 10, name: "Public Announcement System", brands: "Bosch, TOA, Panasonic, Honeywell" },
      { id: 11, name: "Visitor Management system", brands: "EasyLobby (HID), Lobbytrack (Honeywell), SIS VMS" },
      { id: 12, name: "Fire Alarm", brands: "Notifier" },
      { id: 13, name: "Lighting Control System", brands: "Johnson Control, Siemens, ABB, ComfortClick, Cambridge, Clipsal" },
      { id: 14, name: "Home Automation System", brands: "Johnson Control, Siemens, ABB, ComfortClick" },
      { id: 15, name: "Building Automation", brands: "Honeywell, Johnson Control, Reliable Control, Siemens" },
      { id: 16, name: "Building Energy Management System (BEMS)", brands: "Honeywell, Johnson Control, Reliable Control, Siemens" },
      { id: 17, name: "Chiller Plant Management System (CPMS)", brands: "Honeywell, Johnson Control, Reliable Control, Siemens" },
      { id: 18, name: "Network", brands: "Cisco, HP, Zyxel, Link, CommScope" },
      { id: 19, name: "Video Intercom", brands: "Hikvision, Aiphone" },
      { id: 20, name: "Parking Gate Barrier Turnstile", brands: "Dorma KABA, Hikvision, HIP" },
      { id: 21, name: "Generator", brands: "Cummins" },
      { id: 22, name: "Uninterruptible Power Supply (UPS)", brands: "APC, Socomec, Cleanline" }
    ]
  },

  // 3. Services Section (Screenshot 2)
  services: {
    title: "Services",
    titleTh: "Services",
    leftImage: "/images/services-chiller-operation.jpg",
    leftTitle: "Chiller Operation & Maintenance by Certified Engineers",
    leftTitleTh: "การปฏิบัติการและบำรุงรักษาชิลเลอร์โดยวิศวกรผู้เชี่ยวชาญ",
    rightImage: "/images/services-cleanroom-ac.jpg",
    rightTitle: "Cleanroom Decontamination & Air Quality Solutions",
    rightTitleTh: "การทำความสะอาดระบบปรับอากาศและจัดการคุณภาพอากาศคลีนรูม",
    items: [
      "24-Hour Service Call Center",
      "Operational & Engineering Support Services",
      "Preventive Maintenance (PM)",
      "Energy Efficiency Operations",
      "Maintenance Service Contract Management",
      "Equipment Overhaul, Retrofit & System Modification",
      "Indoor Air Quality (IAQ) Management Solutions"
    ],
    itemsTh: [
      "ศูนย์รับแจ้ง 24 ชั่วโมง",
      "การให้บริการลักษณะการปฏิบัติการ",
      "งานบำรุงรักษาเชิงป้องกัน",
      "การปฏิบัติงานเชิงประสิทธิภาพพลังงาน",
      "การจัดการใช้บริการสัญญาการซ่อมบำรุง",
      "การปรับเปลี่ยน และ การดัดแปลงแก้ไข",
      "แนวทางการจัดการคุณภาพอากาศภายในอาคาร"
    ]
  }
};
