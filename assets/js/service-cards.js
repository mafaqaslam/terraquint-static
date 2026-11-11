// The 9 expandable service cards shown on the Home and Services pages.
// Edit a card here once; both pages update.
//   icon      = name of an icon in /assets/icons/sprite.svg
//   shortDesc = text on the card;  fullDesc = text when expanded (Services page)
window.TQ_SERVICE_CARDS = [
    { id: "reservoir", icon: "layers",
      title: "Reservoir Engineering & Simulation",
      shortDesc: "Finite-difference and streamline simulation with history matching and uncertainty quantification for full-field dynamic reservoir modeling.",
      fullDesc: "Reservoir engineering, surveillance and development optimization studies. Finite-difference and streamline simulation with integrated history matching and uncertainty quantification. Advanced modeling of reservoir behavior to optimize development scenarios and estimate reserves and resources. Tools for infill drilling, pressure maintenance, and EOR project planning. Scenarios modeled include vertical, horizontal, and directional wells linked to surface facilities. Skilled with most types of reservoir simulation software. Receive client simulation models and provide opinion about model construction and fit for purpose use.",
      techBadge: "ECLIPSE · CMG · COMSOL · The Kingdom Software"
    },
    { id: "production", icon: "gauge",
      title: "Production Engineering & Field Optimization",
      shortDesc: "Nodal analysis, artificial lift design for ESP, gas lift, and rod pump systems with production forecasting from sandface to sales.",
      fullDesc: "Production engineering, well performance analysis, and field optimization studies. Nodal analysis and artificial lift design for ESP, gas lift, and rod pump systems. Well flowback strategies, production forecasting, and integrated field development planning. Optimize production from sandface to sales.",
      techBadge: "Petroleum Experts IPM · WellFlo"
    },
    { id: "eor-card", icon: "droplets",
      title: "Enhanced Oil Recovery (EOR)",
      shortDesc: "Waterflood, CO₂ injection, thermal recovery, chemical flooding, and SAGD programs for heavy oil production.",
      fullDesc: "Enhanced Oil Recovery (EOR) feasibility studies and project planning. Design and evaluation of waterflood, CO₂ injection, and thermal recovery methods. CO₂ flood screening, design and economic evaluation, from feasibility through pilot to field scale. Chemical flooding (polymer, surfactant, alkaline) and Steam Assisted Gravity Drainage (SAGD) programs for heavy oil production. Simulation-driven EOR design from screening to field implementation.",
      techBadge: "CMG · ECLIPSE · Aspen · COMSOL"
    },
    { id: "decline", icon: "trending-down",
      title: "Decline Curve Analysis",
      shortDesc: "Arps, Duong, and Stretched Exponential methods with probabilistic EUR assessment (P10, P50, P90) and RTA integration.",
      fullDesc: "Decline Curve Analysis and production forecasting for conventional and unconventional assets. Arps (exponential, hyperbolic, harmonic), Duong, and Stretched Exponential Production Decline (SEPD) methods. Rate Transient Analysis (RTA) and probabilistic EUR assessment (P10, P50, P90). Integration with material balance for connected hydrocarbon volume, aquifer support, and drive mechanism characterization.",
      techBadge: "IPM · Petra · Surfer · PHDWIN"
    },
    { id: "facilities", icon: "factory", title: "Facilities Bottleneck Diagnostics", shortDesc: "Production system optimization and debottlenecking across separators, compressors, pumps, and flowlines.", fullDesc: "Production system optimization and facilities debottlenecking across the entire value chain. Integrated network modeling with IPM GAP and PIPESIM. Constraint analysis for separators, compressors, pumps, and flowlines. Process simulation and Aspen process simulation for facility design and capacity expansion studies.", techBadge: "IPM · Aspen · DWSIM · COMSOL" },
    { id: "economic", icon: "circle-dollar-sign", title: "Economic Forecasting", shortDesc: "NPV, IRR, sensitivity analysis, Monte Carlo simulation, and portfolio optimization for upstream investments.", fullDesc: "Economic Forecasting for upstream investment decisions. NPV, IRR, and sensitivity analysis for development projects and acquisitions. Risk-adjusted valuation and monte carlo simulation. Portfolio optimization and investment ranking. Integration with reservoir and production models for full-cycle economics.", techBadge: "Wolfram Mathematica · Matlab · IPM · PHDWIN" },
    { id: "flow", icon: "waves",
      title: "Flow Assurance", shortDesc: "Hydrate management, wax and asphaltene deposition modeling, thermal-hydraulic analysis, and subsea integrity.", fullDesc: "Comprehensive Flow Assurance across the entire production system. Hydrate prevention strategies (thermodynamic/kinetic inhibition, insulation, heating). Wax and asphaltene deposition modeling with thermal-hydraulic analysis. Subsea flowline and riser design. Slugging control and transient operational analysis.", techBadge: "PIPESIM · COMSOL · Aspen" },
    { id: "well-testing", icon: "activity",
      title: "Well Testing", shortDesc: "Pressure transient analysis, deliverability testing, skin and permeability determination, and fracture characterization.", fullDesc: "Well Testing and pressure transient analysis for reservoir characterization. Deliverability testing and well performance evaluation. Skin, permeability, and radius of investigation determination. Fracture characterization and reservoir limit testing. Integration with production data for continuous reservoir surveillance.", techBadge: "Ecrin · PHDWIN · IPM · WellFlo" },
    { id: "equipment", icon: "drafting-compass",
      title: "Equipment Design", shortDesc: "3D CAD modeling, FEA structural analysis, thermal simulation, and pressure vessel design.", fullDesc: "Equipment Design for oil & gas facilities. 3D CAD modeling with Siemens NX and Solidworks. Finite Element Analysis (FEA) for structural integrity. Thermal and multi-physics simulation with COMSOL. Pressure vessel, separator, heat exchanger, pump, and compressor design. Equipment sizing and specification from concept to fabrication.", techBadge: "Siemens NX · Solidworks · COMSOL · Femap" }
  ];
