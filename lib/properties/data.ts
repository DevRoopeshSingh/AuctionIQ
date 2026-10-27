export interface DueDiligenceReport {
  overallRiskLevel: "Low Risk" | "Moderate Risk" | "High Attention Required";
  riskScore: number; // out of 100 (higher = safer)
  titleVerification: {
    cersaiRegistered: boolean;
    cersaiRef: string;
    sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served" | "Section 13(2) Notice Served";
    encumbranceCertificateYears: number; // e.g. 30 years clear
    societyNocStatus: "NOC Issued" | "Pending Society Audit" | "Direct Bank Sale Undertaking";
    pendingSocietyDuesInr: number;
    municipalPropertyTaxClear: boolean;
  };
  marketComparison: {
    circleRatePerSqFt: number; // Ready Reckoner rate INR/sq.ft
    auctionReserveRatePerSqFt: number;
    prevailingMarketRatePerSqFt: number;
    discountToMarketPercent: number;
    recentRegistryComparables: {
      buildingOrRoad: string;
      unitType: string;
      registeredRatePerSqFt: number;
      saleDate: string;
    }[];
    expectedMonthlyRentInr: number;
    grossRentalYieldPercent: number;
  };
  maxBiddingPlanner: {
    conservativeCeilingInr: number;
    aggressiveCeilingInr: number;
    recommendation: string;
    costBreakdown: {
      expectedRenovationInr: number;
      unpaidDuesProvisionInr: number;
      stampDutyAndRegistrationInr: number;
      costOfCapitalInr: number;
    };
  };
  identifiedIssuesAndRisks: {
    category: "Possession" | "Litigation" | "Statutory Dues" | "Physical Condition";
    severity: "low" | "medium" | "high";
    summary: string;
    mitigationStrategy: string;
  }[];
}

export interface PropertyListing {
  ref: string;
  title: string;
  area: string;
  subLocality: string;
  city: "Mumbai" | "Navi Mumbai" | "Thane" | "Pune" | string;
  state?: string;
  type: "Residential" | "Commercial" | "Industrial" | "Land" | string;
  category?: "Apartment" | "Villa" | "Commercial Space" | "Plot/Land" | "Shop/Retail";
  unitConfig: string;
  carpetAreaSqFt: number;
  reservePriceInr: number;
  reservePriceDisplay: string;
  marketValueInr?: number;
  marketValueDisplay?: string;
  discountPercent?: number;
  emdInr: number;
  emdDisplay: string;
  auctionDate: string;
  bankName: string;
  possessionStatus: "Physical Possession Delivered" | "Physical Possession Pending" | "Symbolic Possession";
  noticeType: "SARFAESI Statutory Notice" | "DRT Public Auction" | "NCLT Liquidation Sale" | "SARFAESI Auction";
  statutoryInspectionDates: string;
  smartDoorDevice: string;
  inspectionAvailable: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  lockedItems: string[];
  dueDiligence: DueDiligenceReport;
  financeEligibility: {
    eligibleForPreAuctionSanction: boolean;
    maxLtvPercent: number; // Loan To Value e.g. 70%
    bridgeLoanAvailable: boolean; // 15-day balance settlement
    estimatedInterestRateRange: string;
  };
}

export const LISTED_PROPERTIES: PropertyListing[] = [
  {
    ref: "BOM-WOR-042",
    title: "Sea-Facing Residence · Worli Sea Face",
    area: "South Mumbai",
    subLocality: "Worli Sea Face",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Residential",
    category: "Apartment",
    unitConfig: "3 BHK Luxury Apartment",
    carpetAreaSqFt: 1620,
    reservePriceInr: 48500000,
    reservePriceDisplay: "₹4,85,00,000",
    marketValueInr: 74500000,
    marketValueDisplay: "₹7.45 Cr",
    discountPercent: 35,
    emdInr: 4850000,
    emdDisplay: "₹48,50,000 (10%)",
    auctionDate: "18 Nov 2026",
    bankName: "State Bank of India (SAMB Nariman Point)",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "Sat 14 Nov – Wed 18 Nov 2026",
    smartDoorDevice: "SD-WORLI-402",
    inspectionAvailable: true,
    coordinates: {
      lat: 18.9986,
      lng: 72.8174,
    },
    googleMapsUrl: "https://maps.google.com/?q=18.9986,72.8174",
    lockedItems: ["Exact unit number & society ledger", "Complete 30-year search report"],
    dueDiligence: {
      overallRiskLevel: "Low Risk",
      riskScore: 88,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-SBI-2024-88319",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "NOC Issued",
        pendingSocietyDuesInr: 145000,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 38500,
        auctionReserveRatePerSqFt: 29938,
        prevailingMarketRatePerSqFt: 46000,
        discountToMarketPercent: 34.9,
        recentRegistryComparables: [
          {
            buildingOrRoad: "Samudra Mahal, Worli Sea Face",
            unitType: "3 BHK",
            registeredRatePerSqFt: 48200,
            saleDate: "Sep 2026",
          },
          {
            buildingOrRoad: "Poonam Chambers, Dr Annie Besant Rd",
            unitType: "3 BHK",
            registeredRatePerSqFt: 44500,
            saleDate: "Aug 2026",
          },
        ],
        expectedMonthlyRentInr: 220000,
        grossRentalYieldPercent: 5.4,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 54000000,
        aggressiveCeilingInr: 58500000,
        recommendation: "Strong upside. Keep bids below ₹5.4 Cr to preserve a minimum 25% margin over fair secondary value.",
        costBreakdown: {
          expectedRenovationInr: 1500000,
          unpaidDuesProvisionInr: 250000,
          stampDutyAndRegistrationInr: 2910000,
          costOfCapitalInr: 850000,
        },
      },
      identifiedIssuesAndRisks: [
        {
          category: "Statutory Dues",
          severity: "low",
          summary: "Pending society maintenance dues of ₹1.45 Lakh for the preceding 8 months.",
          mitigationStrategy: "Authorized Officer has agreed to settle dues from the initial 25% auction proceeds under SARFAESI Rule 9.",
        },
        {
          category: "Possession",
          severity: "low",
          summary: "Physical key possession delivered to the Authorized Officer. Keys equipped with SmartDoor digital lock.",
          mitigationStrategy: "Immediate unencumbered physical possession handover upon issuance of Sale Certificate.",
        },
      ],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 75,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "9.25% – 11.5% p.a.",
    },
  },
  {
    ref: "BOM-NP-019",
    title: "Prime Commercial Floor · Nariman Point",
    area: "South Mumbai",
    subLocality: "Nariman Point Business District",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Commercial",
    category: "Commercial Space",
    unitConfig: "Fitted Office Suite (1,150 sq.ft)",
    carpetAreaSqFt: 1150,
    reservePriceInr: 32000000,
    reservePriceDisplay: "₹3,20,00,000",
    marketValueInr: 43700000,
    marketValueDisplay: "₹4.37 Cr",
    discountPercent: 27,
    emdInr: 3200000,
    emdDisplay: "₹32,00,000 (10%)",
    auctionDate: "25 Nov 2026",
    bankName: "Bank of Baroda (CFS Branch)",
    possessionStatus: "Symbolic Possession",
    noticeType: "DRT Public Auction",
    statutoryInspectionDates: "Fri 20 Nov – Mon 23 Nov 2026",
    smartDoorDevice: "SD-NARIMAN-109",
    inspectionAvailable: true,
    coordinates: {
      lat: 18.926,
      lng: 72.8238,
    },
    googleMapsUrl: "https://maps.google.com/?q=18.9260,72.8238",
    lockedItems: ["DRT Case Order copy & schedule", "Office premise utility deposit ledger"],
    dueDiligence: {
      overallRiskLevel: "Moderate Risk",
      riskScore: 72,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-BOB-2023-44109",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "Pending Society Audit",
        pendingSocietyDuesInr: 420000,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 31000,
        auctionReserveRatePerSqFt: 27826,
        prevailingMarketRatePerSqFt: 38000,
        discountToMarketPercent: 26.8,
        recentRegistryComparables: [
          {
            buildingOrRoad: "Mittal Towers, Nariman Point",
            unitType: "Commercial Office",
            registeredRatePerSqFt: 39500,
            saleDate: "Jul 2026",
          },
          {
            buildingOrRoad: "Maker Chambers V, Nariman Point",
            unitType: "Commercial Office",
            registeredRatePerSqFt: 37200,
            saleDate: "Aug 2026",
          },
        ],
        expectedMonthlyRentInr: 175000,
        grossRentalYieldPercent: 6.5,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 36000000,
        aggressiveCeilingInr: 39500000,
        recommendation: "High commercial yield. Factor in Chief Metropolitan Magistrate (CMM) physical possession warrant timeline (typically 45–60 days).",
        costBreakdown: {
          expectedRenovationInr: 800000,
          unpaidDuesProvisionInr: 500000,
          stampDutyAndRegistrationInr: 1920000,
          costOfCapitalInr: 650000,
        },
      },
      identifiedIssuesAndRisks: [
        {
          category: "Possession",
          severity: "medium",
          summary: "Currently in Symbolic Possession. Bank has filed Section 14 application before CMM Mumbai for physical handover.",
          mitigationStrategy: "CMM order application is undefended. Advocate legal review confirms no stay order in DRT-1 Mumbai.",
        },
        {
          category: "Statutory Dues",
          severity: "medium",
          summary: "Society commercial assessment dues of ₹4.2 Lakhs.",
          mitigationStrategy: "Deduct from max bid ceiling to ensure capital recovery upon lease execution.",
        },
      ],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 65,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "10.0% – 12.0% p.a.",
    },
  },
  {
    ref: "NAV-PBR-108",
    title: "Waterfront Tower · Palm Beach Road",
    area: "Navi Mumbai",
    subLocality: "Palm Beach Road, Sector 14 Vashi",
    city: "Navi Mumbai",
    state: "Maharashtra",
    type: "Residential",
    category: "Villa",
    unitConfig: "4 BHK Penthouse with Terrace",
    carpetAreaSqFt: 2380,
    reservePriceInr: 24500000,
    reservePriceDisplay: "₹2,45,00,000",
    marketValueInr: 40000000,
    marketValueDisplay: "₹4.00 Cr",
    discountPercent: 39,
    emdInr: 2450000,
    emdDisplay: "₹24,50,000 (10%)",
    auctionDate: "04 Dec 2026",
    bankName: "HDFC Bank (Special Assets Group)",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Auction",
    statutoryInspectionDates: "Sat 28 Nov – Tue 01 Dec 2026",
    smartDoorDevice: "SD-PALMBEACH-804",
    inspectionAvailable: true,
    coordinates: {
      lat: 19.076,
      lng: 72.9982,
    },
    googleMapsUrl: "https://maps.google.com/?q=19.0760,72.9982",
    lockedItems: ["CIDCO transfer charges assessment", "Original builder tripartite agreement"],
    dueDiligence: {
      overallRiskLevel: "Low Risk",
      riskScore: 92,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-HDFC-2024-99201",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "NOC Issued",
        pendingSocietyDuesInr: 68000,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 14200,
        auctionReserveRatePerSqFt: 10294,
        prevailingMarketRatePerSqFt: 16800,
        discountToMarketPercent: 38.7,
        recentRegistryComparables: [
          {
            buildingOrRoad: "Sea Queen Heritage, Palm Beach Road",
            unitType: "4 BHK",
            registeredRatePerSqFt: 17200,
            saleDate: "Oct 2026",
          },
          {
            buildingOrRoad: "Akshar El Castillo, Vashi",
            unitType: "4 BHK",
            registeredRatePerSqFt: 16400,
            saleDate: "Sep 2026",
          },
        ],
        expectedMonthlyRentInr: 110000,
        grossRentalYieldPercent: 5.4,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 29000000,
        aggressiveCeilingInr: 32000000,
        recommendation: "Exceptional residential asset. CIDCO transfer fee (approx ₹2.5 Lakhs) is verified and accounted for.",
        costBreakdown: {
          expectedRenovationInr: 900000,
          unpaidDuesProvisionInr: 318000,
          stampDutyAndRegistrationInr: 1715000,
          costOfCapitalInr: 450000,
        },
      },
      identifiedIssuesAndRisks: [
        {
          category: "Statutory Dues",
          severity: "low",
          summary: "CIDCO transfer process required for Navi Mumbai leasehold plot ownership.",
          mitigationStrategy: "Standard procedure; CIDCO NOC timeline is 21 working days after Sale Certificate registration.",
        },
      ],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 80,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "8.95% – 10.75% p.a.",
    },
  },
  {
    ref: "BOM-BKC-071",
    title: "Signature Corporate Suite · BKC G-Block",
    area: "South Mumbai",
    subLocality: "Bandra Kurla Complex",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Commercial",
    category: "Commercial Space",
    unitConfig: "Grade-A Commercial Space (2,100 sq.ft)",
    carpetAreaSqFt: 2100,
    reservePriceInr: 69000000,
    reservePriceDisplay: "₹6,90,00,000",
    marketValueInr: 107100000,
    marketValueDisplay: "₹10.71 Cr",
    discountPercent: 36,
    emdInr: 6900000,
    emdDisplay: "₹69,00,000 (10%)",
    auctionDate: "10 Dec 2026",
    bankName: "Punjab National Bank (Zonal Asset Recovery)",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "Wed 02 Dec – Sat 05 Dec 2026",
    smartDoorDevice: "SD-BKC-701",
    inspectionAvailable: true,
    coordinates: {
      lat: 19.0657,
      lng: 72.8687,
    },
    googleMapsUrl: "https://maps.google.com/?q=19.0657,72.8687",
    lockedItems: ["MMRDA sub-lease compliance", "Building fire safety NOC"],
    dueDiligence: {
      overallRiskLevel: "Low Risk",
      riskScore: 90,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-PNB-2024-51208",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "NOC Issued",
        pendingSocietyDuesInr: 210000,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 42000,
        auctionReserveRatePerSqFt: 32857,
        prevailingMarketRatePerSqFt: 51000,
        discountToMarketPercent: 35.5,
        recentRegistryComparables: [
          {
            buildingOrRoad: "ONE BKC, G-Block",
            unitType: "Commercial Office",
            registeredRatePerSqFt: 52000,
            saleDate: "Sep 2026",
          },
        ],
        expectedMonthlyRentInr: 440000,
        grossRentalYieldPercent: 7.6,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 78000000,
        aggressiveCeilingInr: 85000000,
        recommendation: "Prime commercial trophy asset in India's leading financial district. Institutional interest anticipated.",
        costBreakdown: {
          expectedRenovationInr: 2000000,
          unpaidDuesProvisionInr: 500000,
          stampDutyAndRegistrationInr: 4140000,
          costOfCapitalInr: 1500000,
        },
      },
      identifiedIssuesAndRisks: [
        {
          category: "Statutory Dues",
          severity: "low",
          summary: "MMRDA leasehold transfer premium applicable on change of owner.",
          mitigationStrategy: "Factored into max bid ceiling; bank has clear title from original financial institution allotting.",
        },
      ],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 70,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "9.5% – 11.25% p.a.",
    },
  },
  {
    ref: "AQ-959",
    title: "Gokul Horizon · Ulwe Coastal Node",
    area: "Navi Mumbai",
    subLocality: "Sector 19, Ulwe",
    city: "Navi Mumbai",
    state: "Maharashtra",
    type: "Residential",
    category: "Apartment",
    unitConfig: "2 BHK Coastal Apartment",
    carpetAreaSqFt: 1020,
    reservePriceInr: 5800000,
    reservePriceDisplay: "₹58 Lakhs",
    marketValueInr: 8200000,
    marketValueDisplay: "₹82 Lakhs",
    discountPercent: 29,
    emdInr: 580000,
    emdDisplay: "₹5,80,000 (10%)",
    auctionDate: "12 Dec 2026",
    bankName: "State Bank of India",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "05 Dec – 10 Dec 2026",
    smartDoorDevice: "Digital Keypad Pass",
    inspectionAvailable: true,
    coordinates: { lat: 18.9744, lng: 73.0234 },
    googleMapsUrl: "https://maps.google.com/?q=18.9744,73.0234",
    lockedItems: ["CIDCO transfer clearance", "Registry title chain search"],
    dueDiligence: {
      overallRiskLevel: "Low Risk",
      riskScore: 89,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-SBI-2024-10294",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "NOC Issued",
        pendingSocietyDuesInr: 12000,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 4800,
        auctionReserveRatePerSqFt: 5686,
        prevailingMarketRatePerSqFt: 8039,
        discountToMarketPercent: 29.3,
        recentRegistryComparables: [
          { buildingOrRoad: "Ulwe Sector 19 Main Road", unitType: "2 BHK", registeredRatePerSqFt: 8050, saleDate: "Oct 2026" },
        ],
        expectedMonthlyRentInr: 22000,
        grossRentalYieldPercent: 4.5,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 6600000,
        aggressiveCeilingInr: 7100000,
        recommendation: "Upcoming Navi Mumbai International Airport corridor with high rental and capital appreciation. Physical possession delivered.",
        costBreakdown: {
          expectedRenovationInr: 150000,
          unpaidDuesProvisionInr: 25000,
          stampDutyAndRegistrationInr: 350000,
          costOfCapitalInr: 110000,
        },
      },
      identifiedIssuesAndRisks: [
        {
          category: "Possession",
          severity: "low",
          summary: "Physical key possession with Authorized Officer. Move-in ready.",
          mitigationStrategy: "Direct key handover upon full payment settlement.",
        },
      ],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 85,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "8.75% – 10.25% p.a.",
    },
  },
  {
    ref: "AQ-958",
    title: "Shanti Sagar Heights · Panvel City",
    area: "Navi Mumbai",
    subLocality: "New Panvel East",
    city: "Navi Mumbai",
    state: "Maharashtra",
    type: "Residential",
    category: "Apartment",
    unitConfig: "1 BHK Compact Residence",
    carpetAreaSqFt: 580,
    reservePriceInr: 2850000,
    reservePriceDisplay: "₹28.50 Lakhs",
    marketValueInr: 4200000,
    marketValueDisplay: "₹42 Lakhs",
    discountPercent: 32,
    emdInr: 285000,
    emdDisplay: "₹2,85,000 (10%)",
    auctionDate: "15 Dec 2026",
    bankName: "Canara Bank (Asset Recovery)",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "08 Dec – 12 Dec 2026",
    smartDoorDevice: "Digital Keypad Pass",
    inspectionAvailable: true,
    coordinates: { lat: 18.9894, lng: 73.1175 },
    googleMapsUrl: "https://maps.google.com/?q=18.9894,73.1175",
    lockedItems: ["CIDCO layout approval", "Electricity bill ledger"],
    dueDiligence: {
      overallRiskLevel: "Low Risk",
      riskScore: 86,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-CAN-2024-88192",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "Direct Bank Sale Undertaking",
        pendingSocietyDuesInr: 8000,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 3800,
        auctionReserveRatePerSqFt: 4913,
        prevailingMarketRatePerSqFt: 7241,
        discountToMarketPercent: 32.1,
        recentRegistryComparables: [
          { buildingOrRoad: "New Panvel Station Road", unitType: "1 BHK", registeredRatePerSqFt: 7200, saleDate: "Aug 2026" },
        ],
        expectedMonthlyRentInr: 12500,
        grossRentalYieldPercent: 5.3,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 3300000,
        aggressiveCeilingInr: 3600000,
        recommendation: "Entry-level affordable housing with strong rental yield (5.3%). Ideal starter investment in Panvel junction catchment.",
        costBreakdown: {
          expectedRenovationInr: 80000,
          unpaidDuesProvisionInr: 15000,
          stampDutyAndRegistrationInr: 175000,
          costOfCapitalInr: 60000,
        },
      },
      identifiedIssuesAndRisks: [],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 85,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "8.85% – 10.5% p.a.",
    },
  },
  {
    ref: "AQ-957",
    title: "Greenwood Valley Villa · Kharghar Hills",
    area: "Navi Mumbai",
    subLocality: "Sector 35, Kharghar",
    city: "Navi Mumbai",
    state: "Maharashtra",
    type: "Residential",
    category: "Villa",
    unitConfig: "Independent House (G+1 Villa)",
    carpetAreaSqFt: 1850,
    reservePriceInr: 14800000,
    reservePriceDisplay: "₹1.48 Cr",
    marketValueInr: 19500000,
    marketValueDisplay: "₹1.95 Cr",
    discountPercent: 24,
    emdInr: 1480000,
    emdDisplay: "₹14,80,000 (10%)",
    auctionDate: "16 Dec 2026",
    bankName: "Bank of Baroda",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "10 Dec – 14 Dec 2026",
    smartDoorDevice: "Physical Inspection Pass",
    inspectionAvailable: true,
    coordinates: { lat: 19.0473, lng: 73.0689 },
    googleMapsUrl: "https://maps.google.com/?q=19.0473,73.0689",
    lockedItems: ["CIDCO lease allotment certificate", "Municipal building plan sanction"],
    dueDiligence: {
      overallRiskLevel: "Low Risk",
      riskScore: 91,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-BOB-2024-77192",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "Direct Bank Sale Undertaking",
        pendingSocietyDuesInr: 0,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 6500,
        auctionReserveRatePerSqFt: 8000,
        prevailingMarketRatePerSqFt: 10540,
        discountToMarketPercent: 24.1,
        recentRegistryComparables: [
          { buildingOrRoad: "Kharghar Valley Golf Course Vicinity", unitType: "Villa", registeredRatePerSqFt: 10600, saleDate: "Sep 2026" },
        ],
        expectedMonthlyRentInr: 65000,
        grossRentalYieldPercent: 5.3,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 16500000,
        aggressiveCeilingInr: 17500000,
        recommendation: "Rare private villa parcel overlooking Kharghar Valley. Clear title with CIDCO tripartite allotment.",
        costBreakdown: {
          expectedRenovationInr: 300000,
          unpaidDuesProvisionInr: 40000,
          stampDutyAndRegistrationInr: 890000,
          costOfCapitalInr: 250000,
        },
      },
      identifiedIssuesAndRisks: [],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 80,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "8.9% – 10.4% p.a.",
    },
  },
  {
    ref: "AQ-956",
    title: "CIDCO Approved Plot · Dronagiri Port Node",
    area: "Navi Mumbai",
    subLocality: "Sector 47, Dronagiri",
    city: "Navi Mumbai",
    state: "Maharashtra",
    type: "Land",
    category: "Plot/Land",
    unitConfig: "CIDCO Transfer NA Plot (2,400 sq.ft)",
    carpetAreaSqFt: 2400,
    reservePriceInr: 6500000,
    reservePriceDisplay: "₹65 Lakhs",
    marketValueInr: 9800000,
    marketValueDisplay: "₹98 Lakhs",
    discountPercent: 34,
    emdInr: 650000,
    emdDisplay: "₹6,50,000 (10%)",
    auctionDate: "18 Dec 2026",
    bankName: "Union Bank of India",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "11 Dec – 16 Dec 2026",
    smartDoorDevice: "Physical Inspection Pass",
    inspectionAvailable: true,
    coordinates: { lat: 18.8876, lng: 72.9642 },
    googleMapsUrl: "https://maps.google.com/?q=18.8876,72.9642",
    lockedItems: ["CIDCO 12.5% scheme allotment order", "Plot demarcation sketch"],
    dueDiligence: {
      overallRiskLevel: "Low Risk",
      riskScore: 94,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-UBI-2024-33102",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "NOC Issued",
        pendingSocietyDuesInr: 0,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 2200,
        auctionReserveRatePerSqFt: 2708,
        prevailingMarketRatePerSqFt: 4083,
        discountToMarketPercent: 33.7,
        recentRegistryComparables: [
          { buildingOrRoad: "Dronagiri Uran Highway", unitType: "Plot", registeredRatePerSqFt: 4100, saleDate: "Oct 2026" },
        ],
        expectedMonthlyRentInr: 0,
        grossRentalYieldPercent: 0,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 7800000,
        aggressiveCeilingInr: 8500000,
        recommendation: "Rapid growth zone adjacent to JNPT Special Economic Zone and MTHL Atal Setu corridor. Clear CIDCO title.",
        costBreakdown: {
          expectedRenovationInr: 0,
          unpaidDuesProvisionInr: 20000,
          stampDutyAndRegistrationInr: 450000,
          costOfCapitalInr: 120000,
        },
      },
      identifiedIssuesAndRisks: [],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 70,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "9.2% – 11.0% p.a.",
    },
  },
  {
    ref: "AQ-955",
    title: "Corporate Business Arcade · Andheri East",
    area: "Western Suburbs",
    subLocality: "MIDC Andheri East, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Commercial",
    category: "Commercial Space",
    unitConfig: "Grade-A Commercial Office",
    carpetAreaSqFt: 1150,
    reservePriceInr: 24500000,
    reservePriceDisplay: "₹2.45 Cr",
    marketValueInr: 34000000,
    marketValueDisplay: "₹3.40 Cr",
    discountPercent: 28,
    emdInr: 2450000,
    emdDisplay: "₹24,50,000 (10%)",
    auctionDate: "19 Dec 2026",
    bankName: "Punjab National Bank",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "12 Dec – 17 Dec 2026",
    smartDoorDevice: "Digital Keypad Pass",
    inspectionAvailable: true,
    coordinates: { lat: 19.1176, lng: 72.8631 },
    googleMapsUrl: "https://maps.google.com/?q=19.1176,72.8631",
    lockedItems: ["MCGM occupancy certificate", "MIDC sub-lease compliance"],
    dueDiligence: {
      overallRiskLevel: "Low Risk",
      riskScore: 88,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-PNB-2024-99120",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "NOC Issued",
        pendingSocietyDuesInr: 15000,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 16500,
        auctionReserveRatePerSqFt: 21304,
        prevailingMarketRatePerSqFt: 29565,
        discountToMarketPercent: 27.9,
        recentRegistryComparables: [
          { buildingOrRoad: "MIDC Central Road, Andheri East", unitType: "Office", registeredRatePerSqFt: 29800, saleDate: "Sep 2026" },
        ],
        expectedMonthlyRentInr: 165000,
        grossRentalYieldPercent: 8.1,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 27500000,
        aggressiveCeilingInr: 29500000,
        recommendation: "Ready to occupy commercial office in Mumbai's prime corporate cluster. 500m from Western Express Highway Metro.",
        costBreakdown: {
          expectedRenovationInr: 200000,
          unpaidDuesProvisionInr: 30000,
          stampDutyAndRegistrationInr: 1470000,
          costOfCapitalInr: 350000,
        },
      },
      identifiedIssuesAndRisks: [],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 80,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "8.95% – 10.5% p.a.",
    },
  },
  {
    ref: "AQ-954",
    title: "Hiranandani Vicinity Luxury Flat · Powai",
    area: "Central Suburbs",
    subLocality: "Powai Lake Boulevard, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Residential",
    category: "Apartment",
    unitConfig: "3 BHK Modern Apartment",
    carpetAreaSqFt: 1410,
    reservePriceInr: 29500000,
    reservePriceDisplay: "₹2.95 Cr",
    marketValueInr: 39000000,
    marketValueDisplay: "₹3.90 Cr",
    discountPercent: 24,
    emdInr: 2950000,
    emdDisplay: "₹29,50,000 (10%)",
    auctionDate: "20 Dec 2026",
    bankName: "HDFC Bank",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "14 Dec – 18 Dec 2026",
    smartDoorDevice: "Physical Inspection Pass",
    inspectionAvailable: true,
    coordinates: { lat: 19.1197, lng: 72.9051 },
    googleMapsUrl: "https://maps.google.com/?q=19.1197,72.9051",
    lockedItems: ["MCGM A-Form extract", "Adani Electricity transfer receipt"],
    dueDiligence: {
      overallRiskLevel: "Low Risk",
      riskScore: 90,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-HDF-2024-44291",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "NOC Issued",
        pendingSocietyDuesInr: 28000,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 17200,
        auctionReserveRatePerSqFt: 20921,
        prevailingMarketRatePerSqFt: 27659,
        discountToMarketPercent: 24.4,
        recentRegistryComparables: [
          { buildingOrRoad: "Powai Lake Boulevard", unitType: "3 BHK", registeredRatePerSqFt: 27800, saleDate: "Oct 2026" },
        ],
        expectedMonthlyRentInr: 110000,
        grossRentalYieldPercent: 4.5,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 33000000,
        aggressiveCeilingInr: 35000000,
        recommendation: "High-demand executive residential enclave with unhindered Powai hill views. Clear title with OC.",
        costBreakdown: {
          expectedRenovationInr: 200000,
          unpaidDuesProvisionInr: 50000,
          stampDutyAndRegistrationInr: 1770000,
          costOfCapitalInr: 450000,
        },
      },
      identifiedIssuesAndRisks: [],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 80,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "8.85% – 10.35% p.a.",
    },
  },
  {
    ref: "AQ-953",
    title: "Shivaji Park Classic Residence · Dadar West",
    area: "South Mumbai",
    subLocality: "Cadell Road, Dadar West, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Residential",
    category: "Apartment",
    unitConfig: "2.5 BHK Heritage Residence",
    carpetAreaSqFt: 1280,
    reservePriceInr: 38500000,
    reservePriceDisplay: "₹3.85 Cr",
    marketValueInr: 49500000,
    marketValueDisplay: "₹4.95 Cr",
    discountPercent: 22,
    emdInr: 3850000,
    emdDisplay: "₹38,50,000 (10%)",
    auctionDate: "22 Dec 2026",
    bankName: "State Bank of India",
    possessionStatus: "Symbolic Possession",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "15 Dec – 20 Dec 2026",
    smartDoorDevice: "Physical Inspection Pass",
    inspectionAvailable: true,
    coordinates: { lat: 19.0282, lng: 72.8397 },
    googleMapsUrl: "https://maps.google.com/?q=19.0282,72.8397",
    lockedItems: ["Section 14 CMM Mumbai petition copy", "Cooperative housing society share certificate"],
    dueDiligence: {
      overallRiskLevel: "Moderate Risk",
      riskScore: 74,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-SBI-2024-66281",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "Direct Bank Sale Undertaking",
        pendingSocietyDuesInr: 0,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 26000,
        auctionReserveRatePerSqFt: 30078,
        prevailingMarketRatePerSqFt: 38671,
        discountToMarketPercent: 22.2,
        recentRegistryComparables: [
          { buildingOrRoad: "Cadell Road Seaface", unitType: "Residential Flat", registeredRatePerSqFt: 39000, saleDate: "Aug 2026" },
        ],
        expectedMonthlyRentInr: 135000,
        grossRentalYieldPercent: 4.2,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 42000000,
        aggressiveCeilingInr: 44500000,
        recommendation: "Currently in Symbolic Possession. Bank has filed Section 14 CMM application in Mumbai. AuctionIQ team assists with smooth eviction transition.",
        costBreakdown: {
          expectedRenovationInr: 350000,
          unpaidDuesProvisionInr: 50000,
          stampDutyAndRegistrationInr: 2310000,
          costOfCapitalInr: 550000,
        },
      },
      identifiedIssuesAndRisks: [
        {
          category: "Possession",
          severity: "medium",
          summary: "Symbolic possession under Section 13(4). CMM Mumbai physical warrant scheduled in ~45 days.",
          mitigationStrategy: "Legal team confirms undefended bank petition with no adverse interim orders.",
        },
      ],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 75,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "9.25% – 11.0% p.a.",
    },
  },
  {
    ref: "AQ-950",
    title: "Lower Parel Mill Compound Suite · Lower Parel",
    area: "South Mumbai",
    subLocality: "Senapati Bapat Marg, Lower Parel, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Commercial",
    category: "Commercial Space",
    unitConfig: "High-Ceiling Commercial Studio",
    carpetAreaSqFt: 1350,
    reservePriceInr: 41000000,
    reservePriceDisplay: "₹4.10 Cr",
    marketValueInr: 56000000,
    marketValueDisplay: "₹5.60 Cr",
    discountPercent: 27,
    emdInr: 4100000,
    emdDisplay: "₹41,00,000 (10%)",
    auctionDate: "24 Dec 2026",
    bankName: "ICICI Bank",
    possessionStatus: "Symbolic Possession",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "18 Dec – 22 Dec 2026",
    smartDoorDevice: "Digital Keypad Pass",
    inspectionAvailable: true,
    coordinates: { lat: 18.9953, lng: 72.8295 },
    googleMapsUrl: "https://maps.google.com/?q=18.9953,72.8295",
    lockedItems: ["Commercial condominium declaration", "Building elevation blueprint"],
    dueDiligence: {
      overallRiskLevel: "Moderate Risk",
      riskScore: 78,
      titleVerification: {
        cersaiRegistered: true,
        cersaiRef: "CERSAI-ICI-2024-55102",
        sarfaesiNoticeStatus: "Section 13(4) Statutory Notice Served",
        encumbranceCertificateYears: 30,
        societyNocStatus: "Pending Society Audit",
        pendingSocietyDuesInr: 32000,
        municipalPropertyTaxClear: true,
      },
      marketComparison: {
        circleRatePerSqFt: 23000,
        auctionReserveRatePerSqFt: 30370,
        prevailingMarketRatePerSqFt: 41481,
        discountToMarketPercent: 26.8,
        recentRegistryComparables: [
          { buildingOrRoad: "Senapati Bapat Marg Commercial Complex", unitType: "Office", registeredRatePerSqFt: 41500, saleDate: "Sep 2026" },
        ],
        expectedMonthlyRentInr: 250000,
        grossRentalYieldPercent: 7.3,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 46000000,
        aggressiveCeilingInr: 49500000,
        recommendation: "Prime commercial asset in Lower Parel business district. Borrower in amicable settlement talks for keys handover.",
        costBreakdown: {
          expectedRenovationInr: 250000,
          unpaidDuesProvisionInr: 60000,
          stampDutyAndRegistrationInr: 2460000,
          costOfCapitalInr: 600000,
        },
      },
      identifiedIssuesAndRisks: [
        {
          category: "Possession",
          severity: "medium",
          summary: "Symbolic possession. Borrower has surrendered keys in settlement talks.",
          mitigationStrategy: "Bank Authorized Officer anticipates physical handover within 30 days.",
        },
      ],
    },
    financeEligibility: {
      eligibleForPreAuctionSanction: true,
      maxLtvPercent: 80,
      bridgeLoanAvailable: true,
      estimatedInterestRateRange: "9.0% – 10.75% p.a.",
    },
  },
];
