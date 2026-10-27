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
  city: "Mumbai" | "Navi Mumbai" | "Bengaluru" | "Hyderabad" | "Thane" | "Pune" | string;
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
    title: "SHIVA SAI NILAYAM",
    area: "Hyderabad East",
    subLocality: "Peerzadiguda",
    city: "Hyderabad",
    state: "Telangana",
    type: "Residential",
    category: "Apartment",
    unitConfig: "2 BHK Residential Apartment",
    carpetAreaSqFt: 1020,
    reservePriceInr: 3800000,
    reservePriceDisplay: "₹38 Lakhs",
    marketValueInr: 5500000,
    marketValueDisplay: "₹55 Lakhs",
    discountPercent: 31,
    emdInr: 380000,
    emdDisplay: "₹3,80,000 (10%)",
    auctionDate: "12 Dec 2026",
    bankName: "State Bank of India",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "05 Dec – 10 Dec 2026",
    smartDoorDevice: "SD-HYD-959",
    inspectionAvailable: true,
    coordinates: { lat: 17.4082, lng: 78.5861 },
    googleMapsUrl: "https://maps.google.com/?q=17.4082,78.5861",
    lockedItems: ["GHMC property tax assessment", "Registry title chain search"],
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
        circleRatePerSqFt: 3200,
        auctionReserveRatePerSqFt: 3725,
        prevailingMarketRatePerSqFt: 5400,
        discountToMarketPercent: 31.0,
        recentRegistryComparables: [
          { buildingOrRoad: "Peerzadiguda Main Rd", unitType: "2 BHK", registeredRatePerSqFt: 5350, saleDate: "Oct 2026" },
        ],
        expectedMonthlyRentInr: 16000,
        grossRentalYieldPercent: 5.1,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 4400000,
        aggressiveCeilingInr: 4800000,
        recommendation: "High rental demand corridor near Uppal Metro. Bid up to ₹44 Lakhs for solid 25% equity cushion.",
        costBreakdown: {
          expectedRenovationInr: 150000,
          unpaidDuesProvisionInr: 25000,
          stampDutyAndRegistrationInr: 285000,
          costOfCapitalInr: 80000,
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
    title: "SHANTI PRIYA RESIDENCY",
    area: "Hyderabad West",
    subLocality: "Sri Rama Nagar",
    city: "Hyderabad",
    state: "Telangana",
    type: "Residential",
    category: "Apartment",
    unitConfig: "1 BHK Compact Residence",
    carpetAreaSqFt: 580,
    reservePriceInr: 1411000,
    reservePriceDisplay: "₹14.11 Lakhs",
    marketValueInr: 2200000,
    marketValueDisplay: "₹22 Lakhs",
    discountPercent: 36,
    emdInr: 141100,
    emdDisplay: "₹1,41,100 (10%)",
    auctionDate: "15 Dec 2026",
    bankName: "Canara Bank (Asset Recovery)",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "08 Dec – 12 Dec 2026",
    smartDoorDevice: "SD-HYD-958",
    inspectionAvailable: true,
    coordinates: { lat: 17.4568, lng: 78.3619 },
    googleMapsUrl: "https://maps.google.com/?q=17.4568,78.3619",
    lockedItems: ["Panchayat layout approval", "Electricity bill ledger"],
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
        circleRatePerSqFt: 2100,
        auctionReserveRatePerSqFt: 2432,
        prevailingMarketRatePerSqFt: 3800,
        discountToMarketPercent: 36.0,
        recentRegistryComparables: [
          { buildingOrRoad: "Sri Rama Nagar 2nd Cross", unitType: "1 BHK", registeredRatePerSqFt: 3750, saleDate: "Aug 2026" },
        ],
        expectedMonthlyRentInr: 8500,
        grossRentalYieldPercent: 7.2,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 1650000,
        aggressiveCeilingInr: 1800000,
        recommendation: "Entry-level affordable housing with strong rental yield (7.2%). Ideal starter investment.",
        costBreakdown: {
          expectedRenovationInr: 80000,
          unpaidDuesProvisionInr: 15000,
          stampDutyAndRegistrationInr: 110000,
          costOfCapitalInr: 35000,
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
    title: "Independent House · Pillagumpe",
    area: "Bengaluru Rural",
    subLocality: "Pillagumpe Village, Hoskote",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Residential",
    category: "Villa",
    unitConfig: "Independent House (G+1 Villa)",
    carpetAreaSqFt: 1850,
    reservePriceInr: 11800000,
    reservePriceDisplay: "₹1.18 Cr",
    marketValueInr: 14800000,
    marketValueDisplay: "₹1.48 Cr",
    discountPercent: 20,
    emdInr: 1180000,
    emdDisplay: "₹11,80,000 (10%)",
    auctionDate: "16 Dec 2026",
    bankName: "Bank of Baroda",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "10 Dec – 14 Dec 2026",
    smartDoorDevice: "SD-BLR-957",
    inspectionAvailable: true,
    coordinates: { lat: 13.0642, lng: 77.7981 },
    googleMapsUrl: "https://maps.google.com/?q=13.0642,77.7981",
    lockedItems: ["E-Khata certificate extract", "Gram Panchayat building sanction"],
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
        circleRatePerSqFt: 4500,
        auctionReserveRatePerSqFt: 6378,
        prevailingMarketRatePerSqFt: 8000,
        discountToMarketPercent: 20.3,
        recentRegistryComparables: [
          { buildingOrRoad: "Hoskote Industrial Corridor", unitType: "Villa", registeredRatePerSqFt: 8100, saleDate: "Sep 2026" },
        ],
        expectedMonthlyRentInr: 42000,
        grossRentalYieldPercent: 4.3,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 13000000,
        aggressiveCeilingInr: 13800000,
        recommendation: "Individual title deed with private boundary wall. Freehold land parcel.",
        costBreakdown: {
          expectedRenovationInr: 300000,
          unpaidDuesProvisionInr: 40000,
          stampDutyAndRegistrationInr: 780000,
          costOfCapitalInr: 220000,
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
    title: "Plotted Estate · Bluejay Uttar",
    area: "Bengaluru North",
    subLocality: "Bluejay Uttar Layout, Devanahalli",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Land",
    category: "Plot/Land",
    unitConfig: "Gated Community Villa Plot (2,400 sq.ft)",
    carpetAreaSqFt: 2400,
    reservePriceInr: 6500000,
    reservePriceDisplay: "₹65 Lakhs",
    marketValueInr: 10500000,
    marketValueDisplay: "₹1.05 Cr",
    discountPercent: 38,
    emdInr: 650000,
    emdDisplay: "₹6,50,000 (10%)",
    auctionDate: "18 Dec 2026",
    bankName: "Union Bank of India",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "11 Dec – 16 Dec 2026",
    smartDoorDevice: "SD-BLR-956",
    inspectionAvailable: true,
    coordinates: { lat: 13.2437, lng: 77.7126 },
    googleMapsUrl: "https://maps.google.com/?q=13.2437,77.7126",
    lockedItems: ["BIAAPA Layout Approval order", "Plot demarcation sketch"],
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
        prevailingMarketRatePerSqFt: 4375,
        discountToMarketPercent: 38.1,
        recentRegistryComparables: [
          { buildingOrRoad: "Devanahalli Airport Road", unitType: "Plot", registeredRatePerSqFt: 4400, saleDate: "Oct 2026" },
        ],
        expectedMonthlyRentInr: 0,
        grossRentalYieldPercent: 0,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 7800000,
        aggressiveCeilingInr: 8500000,
        recommendation: "Rapid capital appreciation corridor near Kempegowda International Airport. Clear BIAAPA title.",
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
    title: "Maithri Mandaram · Kapra",
    area: "Hyderabad North",
    subLocality: "Kapra Village, ECIL",
    city: "Hyderabad",
    state: "Telangana",
    type: "Residential",
    category: "Apartment",
    unitConfig: "2 BHK Ready Flat",
    carpetAreaSqFt: 980,
    reservePriceInr: 3627000,
    reservePriceDisplay: "₹36.27 Lakhs",
    marketValueInr: 5200000,
    marketValueDisplay: "₹52 Lakhs",
    discountPercent: 30,
    emdInr: 362700,
    emdDisplay: "₹3,62,700 (10%)",
    auctionDate: "19 Dec 2026",
    bankName: "Punjab National Bank",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "12 Dec – 17 Dec 2026",
    smartDoorDevice: "SD-HYD-955",
    inspectionAvailable: true,
    coordinates: { lat: 17.4891, lng: 78.5638 },
    googleMapsUrl: "https://maps.google.com/?q=17.4891,78.5638",
    lockedItems: ["GHMC occupancy certificate", "Water board connection receipt"],
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
        circleRatePerSqFt: 3100,
        auctionReserveRatePerSqFt: 3701,
        prevailingMarketRatePerSqFt: 5300,
        discountToMarketPercent: 30.2,
        recentRegistryComparables: [
          { buildingOrRoad: "ECIL Kapra Main Road", unitType: "2 BHK", registeredRatePerSqFt: 5250, saleDate: "Sep 2026" },
        ],
        expectedMonthlyRentInr: 18000,
        grossRentalYieldPercent: 6.0,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 4200000,
        aggressiveCeilingInr: 4500000,
        recommendation: "Ready to occupy gated residential block. Good access to Secunderabad railway hub.",
        costBreakdown: {
          expectedRenovationInr: 100000,
          unpaidDuesProvisionInr: 30000,
          stampDutyAndRegistrationInr: 250000,
          costOfCapitalInr: 75000,
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
    title: "Unity Residency · Yelahanka",
    area: "Bengaluru North",
    subLocality: "Yelahanka New Town",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Residential",
    category: "Apartment",
    unitConfig: "3 BHK Modern Apartment",
    carpetAreaSqFt: 1410,
    reservePriceInr: 10100000,
    reservePriceDisplay: "₹1.01 Cr",
    marketValueInr: 13000000,
    marketValueDisplay: "₹1.30 Cr",
    discountPercent: 22,
    emdInr: 1010000,
    emdDisplay: "₹10,10,000 (10%)",
    auctionDate: "20 Dec 2026",
    bankName: "HDFC Bank",
    possessionStatus: "Physical Possession Delivered",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "14 Dec – 18 Dec 2026",
    smartDoorDevice: "SD-BLR-954",
    inspectionAvailable: true,
    coordinates: { lat: 13.1007, lng: 77.5963 },
    googleMapsUrl: "https://maps.google.com/?q=13.1007,77.5963",
    lockedItems: ["BBMP A-Khata extract", "Bescom electricity transfer receipt"],
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
        circleRatePerSqFt: 5800,
        auctionReserveRatePerSqFt: 7163,
        prevailingMarketRatePerSqFt: 9220,
        discountToMarketPercent: 22.3,
        recentRegistryComparables: [
          { buildingOrRoad: "Yelahanka Major Sandeep Unnikrishnan Rd", unitType: "3 BHK", registeredRatePerSqFt: 9150, saleDate: "Oct 2026" },
        ],
        expectedMonthlyRentInr: 45000,
        grossRentalYieldPercent: 5.3,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 11500000,
        aggressiveCeilingInr: 12200000,
        recommendation: "High-demand IT corridor connectivity. Clear A-Khata with OC.",
        costBreakdown: {
          expectedRenovationInr: 200000,
          unpaidDuesProvisionInr: 50000,
          stampDutyAndRegistrationInr: 680000,
          costOfCapitalInr: 180000,
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
    title: "Independent House · Banashankari",
    area: "Bengaluru South",
    subLocality: "Banashankari 3rd Stage",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Residential",
    category: "Villa",
    unitConfig: "3 BHK Independent Villa",
    carpetAreaSqFt: 1600,
    reservePriceInr: 9533000,
    reservePriceDisplay: "₹95.33 Lakhs",
    marketValueInr: 12000000,
    marketValueDisplay: "₹1.20 Cr",
    discountPercent: 21,
    emdInr: 953300,
    emdDisplay: "₹9,53,300 (10%)",
    auctionDate: "22 Dec 2026",
    bankName: "State Bank of India",
    possessionStatus: "Symbolic Possession",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "15 Dec – 20 Dec 2026",
    smartDoorDevice: "SD-BLR-953",
    inspectionAvailable: true,
    coordinates: { lat: 12.9255, lng: 77.5468 },
    googleMapsUrl: "https://maps.google.com/?q=12.9255,77.5468",
    lockedItems: ["Section 14 CMM Petition copy", "BDA site allotment letter"],
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
        circleRatePerSqFt: 5200,
        auctionReserveRatePerSqFt: 5958,
        prevailingMarketRatePerSqFt: 7500,
        discountToMarketPercent: 20.6,
        recentRegistryComparables: [
          { buildingOrRoad: "Banashankari Ring Road", unitType: "Independent House", registeredRatePerSqFt: 7600, saleDate: "Aug 2026" },
        ],
        expectedMonthlyRentInr: 38000,
        grossRentalYieldPercent: 4.8,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 10400000,
        aggressiveCeilingInr: 11000000,
        recommendation: "Currently in Symbolic Possession. Bank has filed Section 14 CMM application in Bengaluru. AuctionIQ team assists with smooth eviction transition.",
        costBreakdown: {
          expectedRenovationInr: 350000,
          unpaidDuesProvisionInr: 50000,
          stampDutyAndRegistrationInr: 630000,
          costOfCapitalInr: 160000,
        },
      },
      identifiedIssuesAndRisks: [
        {
          category: "Possession",
          severity: "medium",
          summary: "Symbolic possession under Section 13(4). CMM Bengaluru physical warrant scheduled in ~45 days.",
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
    title: "Global Nandanam · Chikkabanavara",
    area: "Bengaluru West",
    subLocality: "Kereguddadahalli",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Residential",
    category: "Apartment",
    unitConfig: "2 BHK Residential Flat",
    carpetAreaSqFt: 1050,
    reservePriceInr: 4640000,
    reservePriceDisplay: "₹46.40 Lakhs",
    marketValueInr: 6500000,
    marketValueDisplay: "₹65 Lakhs",
    discountPercent: 29,
    emdInr: 464000,
    emdDisplay: "₹4,64,000 (10%)",
    auctionDate: "24 Dec 2026",
    bankName: "ICICI Bank",
    possessionStatus: "Symbolic Possession",
    noticeType: "SARFAESI Statutory Notice",
    statutoryInspectionDates: "18 Dec – 22 Dec 2026",
    smartDoorDevice: "SD-BLR-950",
    inspectionAvailable: true,
    coordinates: { lat: 13.0694, lng: 77.5144 },
    googleMapsUrl: "https://maps.google.com/?q=13.0694,77.5144",
    lockedItems: ["Society ledger statement", "Building elevation blueprint"],
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
        circleRatePerSqFt: 3400,
        auctionReserveRatePerSqFt: 4419,
        prevailingMarketRatePerSqFt: 6190,
        discountToMarketPercent: 28.6,
        recentRegistryComparables: [
          { buildingOrRoad: "Kereguddadahalli Main Road", unitType: "2 BHK", registeredRatePerSqFt: 6100, saleDate: "Sep 2026" },
        ],
        expectedMonthlyRentInr: 21000,
        grossRentalYieldPercent: 5.4,
      },
      maxBiddingPlanner: {
        conservativeCeilingInr: 5200000,
        aggressiveCeilingInr: 5600000,
        recommendation: "Substantial 29% discount. Factor in society audit closure before lease registration.",
        costBreakdown: {
          expectedRenovationInr: 150000,
          unpaidDuesProvisionInr: 60000,
          stampDutyAndRegistrationInr: 310000,
          costOfCapitalInr: 95000,
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
