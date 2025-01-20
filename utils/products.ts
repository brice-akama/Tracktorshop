import { imagePaths } from './images'; // './' because they're in the same folder

export type Product = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category?: string; // Optional category
  description: string;
  thumbnails: string[];
  specialOffer: boolean;
  popularSet: boolean;
  hydraulicPart: boolean;
  tractorBrands: boolean;  // Add specialOffer here
};


                                        
export const products: Product[] = [
  {
    id: 1,
    name: 'Brake pedal Shaft',
    price: '$10',
    imageUrl: imagePaths.blakeprada,
    category: 'Vehicle Components',
    description: 'A reliable brake pedal shaft for various models of vehicles, ensuring smooth operation.',
    thumbnails: [imagePaths.steeringbearings, imagePaths.hydraulicpump, imagePaths.powersteering],
    specialOffer: true, 
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: false,// Added specialOffer: true
  },
  {
    id: 2,
    name: 'Fuel injector Set',
    price: '$20',
    imageUrl: imagePaths.fuelinjector,
    category: 'Engine Components',
    description: 'Complete fuel injector set for optimized engine performance and fuel efficiency.',
    thumbnails: [imagePaths.valves, imagePaths.gasterset, imagePaths.oilfilter],
    specialOffer: true,
    popularSet: false,
    hydraulicPart: false, 
    tractorBrands: false,// Added specialOffer: true
  },
  {
    id: 3,
    name: 'Hydraulic Pump',
    price: '$30',
    imageUrl: imagePaths.hydraulicpump,
    category: 'Hydraulic Systems',
    description: 'Durable hydraulic pump designed for efficient fluid circulation in heavy machinery.',
    thumbnails: [imagePaths.hydraulic, imagePaths.hydrauliccylinde, imagePaths.spool3],
    specialOffer: true,
    popularSet: false, 
    hydraulicPart: false,
    tractorBrands: false,// Added specialOffer: true
  },
  {
    id: 4,
    name: 'Hydraulic arm',
    price: '$40',
    imageUrl: imagePaths.hydraulic,
    category: 'Hydraulic Systems',
    description: 'High-strength hydraulic arm for use in industrial applications and machinery.',
    thumbnails: [imagePaths.hydraulicpowerunite, imagePaths.controlve, imagePaths.hydraulicorbital],
    specialOffer: true,
    popularSet: false, 
    hydraulicPart: false,
    tractorBrands: false,// Added specialOffer: true
  },
  {
    id: 5,
    name: 'Oil filter and Fuel filter',
    price: '$50',
    imageUrl: imagePaths.oilfilter,
    category: 'Engine Maintenance',
    description: 'A set of oil and fuel filters designed to ensure smooth engine operation and longevity.',
    thumbnails: [imagePaths.waterpump, imagePaths.startersolenoid, imagePaths.engineparts],
    specialOffer: true,
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: false, // Added specialOffer: true
  },
  {
    id: 6,
    name: 'Power Steering',
    price: '$60',
    imageUrl: imagePaths.powersteering,
    category: 'Steering Systems',
    description: 'Precision-engineered power steering for enhanced vehicle maneuverability and control.',
    thumbnails: [imagePaths.steeringshaft, imagePaths.steeringknucckle, imagePaths.tieroad],
    specialOffer: true,
    popularSet: false,
    hydraulicPart: false, 
    tractorBrands: false,// Added specialOffer: true
  },
  {
    id: 7,
    name: 'Starter Solenoid',
    price: '$70',
    imageUrl: imagePaths.startersolenoid,
    category: 'Electrical Components',
    description: 'High-quality starter solenoid for reliable engine startup in various vehicles.',
    thumbnails: [imagePaths.fortlight, imagePaths.valves, imagePaths.hydraulicgearpu],
    specialOffer: true, 
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: false,// Added specialOffer: true
  },
  {
    id: 8,
    name: 'Water pump hose tube',
    price: '$80',
    imageUrl: imagePaths.waterpump,
    category: 'Cooling Systems',
    description: 'Water pump hose tube designed for fluid transfer in cooling systems and engines.',
    thumbnails: [imagePaths.oilfilter, imagePaths.uppertop, imagePaths.dieselpump],
    specialOffer: true,
    popularSet: false, 
    hydraulicPart: false,
    tractorBrands: false,// Added specialOffer: true
  },
];


export const popularSet: Product[] = [
  {
    id: 9,
    name: 'Engine parts',
    price: '$25',
    imageUrl: imagePaths.engineparts,
    category: 'Engine Components',
    description: 'A collection of essential engine parts for vehicle maintenance and repairs.',
    thumbnails: [imagePaths.enginespring, imagePaths.oilfilter, imagePaths.blakeprada],
    specialOffer: false, 
    popularSet: true,
    hydraulicPart: false, 
    tractorBrands: false, // Added here
  },
  {
    id: 10,
    name: 'Front and Rear Fender Light',
    price: '$35',
    imageUrl: imagePaths.fortlight,
    category: 'Lighting & Safety',
    description: 'Front and rear fender light kit for better vehicle visibility and safety.',
    thumbnails: [imagePaths.waterpump, imagePaths.hydraulic, imagePaths.valves],
    specialOffer: false, 
    popularSet: true, 
    hydraulicPart: false,
    tractorBrands: false, // Added here
  },
  {
    id: 11,
    name: 'Steering shaft',
    price: '$45',
    imageUrl: imagePaths.steeringshaft,
    category: 'Steering Systems',
    description: 'Precision steering shaft for a smoother and more responsive steering experience.',
    thumbnails: [imagePaths.tieroad, imagePaths.steeringknucckle, imagePaths.uppertop],
    specialOffer: false, 
    popularSet: true, 
    hydraulicPart: false, 
    tractorBrands: false,// Added here
  },
  {
    id: 12,
    name: 'Steering Set Bearing',
    price: '$55',
    imageUrl: imagePaths.steeringbearings,
    category: 'Steering Systems',
    description: 'High-quality steering set bearing for improved control and durability.',
    thumbnails: [imagePaths.hydraulicgearpu, imagePaths.gasterset, imagePaths.flywheel],
    specialOffer: false, 
    popularSet: true,
    hydraulicPart: false, 
    tractorBrands: false, // Added here
  },
  {
    id: 13,
    name: 'Steering Knuckle',
    price: '$65',
    imageUrl: imagePaths.steeringknucckle,
    category: 'Steering Systems',
    description: 'Steering knuckle designed for greater steering precision and handling performance.',
    thumbnails: [imagePaths.controlve, imagePaths.enginespring, imagePaths.dieselpump],
    specialOffer: false, 
    popularSet: true,
    hydraulicPart: false, 
    tractorBrands: false, // Added here
  },
  {
    id: 14,
    name: 'Valves',
    price: '$65',
    imageUrl: imagePaths.valves,
    category: 'Engine Components',
    description: 'Engine valves designed for optimal engine performance and emissions control.',
    thumbnails: [imagePaths.gasterset, imagePaths.hydraulic, imagePaths.startersolenoid],
    specialOffer: false, 
    popularSet: true, 
    hydraulicPart: false, 
    tractorBrands: false,// Added here
  },
  {
    id: 15,
    name: 'Engine Springs',
    price: '$65',
    imageUrl: imagePaths.enginespring,
    category: 'Engine Components',
    description: 'Durable engine springs for improved engine operation and longevity.',
    thumbnails: [imagePaths.engineparts, imagePaths.flywheel, imagePaths.hydraulicpowerunite],
    specialOffer: false, 
    popularSet: true, 
    hydraulicPart: false, 
    tractorBrands: false,// Added here
  },
  {
    id: 16,
    name: 'Tie Rod Steering',
    price: '$65',
    imageUrl: imagePaths.tieroad,
    category: 'Suspension & Steering',
    description: 'Tie rod steering for enhanced vehicle control and suspension performance.',
    thumbnails: [imagePaths.steeringshaft, imagePaths.uppertop, imagePaths.priston],
    specialOffer: false, 
    popularSet: true, 
    hydraulicPart: false,
    tractorBrands: false, // Added here
  },
  {
    id: 17,
    name: 'Upper Top Engine Cylinder',
    price: '$65',
    imageUrl: imagePaths.uppertop,
    category: 'Engine Components',
    description: 'Upper top engine cylinder designed for efficient combustion and performance.',
    thumbnails: [imagePaths.hydraulicgearpu, imagePaths.valves, imagePaths.dieselpump],
    specialOffer: false, 
    popularSet: true, 
    hydraulicPart: false,
    tractorBrands: false, // Added here
  },
  {
    id: 18,
    name: 'Gasket Set',
    price: '$65',
    imageUrl: imagePaths.gasterset,
    category: 'Engine Maintenance',
    description: 'Engine gasket set for sealing and preventing leaks in various engine systems.',
    thumbnails: [imagePaths.controlve, imagePaths.hmr37, imagePaths.oilfilter],
    specialOffer: false, 
    popularSet: true, 
    hydraulicPart: false, 
    tractorBrands: false,// Added here
  },
];

export const hydraulic: Product[] = [
  { 
    id: 19, 
    name: 'Hydraulic Power', 
    price: '$25', 
    imageUrl: imagePaths.hydraulicpowerunite, 
    thumbnails: [imagePaths.hydraulicpump, imagePaths.controlve, imagePaths.hydraulicgearpum], // Thumbnails
    category: 'Hydraulic Systems', 
    description: 'Hydraulic power unit designed to provide reliable performance in industrial machinery.',
    specialOffer: false, 
    popularSet: false, 
    hydraulicPart: true,
    tractorBrands: false, // Added hydraulicPart: true
  },
  { 
    id: 20, 
    name: 'Control Valve Directional', 
    price: '$35', 
    imageUrl: imagePaths.controlve, 
    thumbnails: [imagePaths.valves, imagePaths.hydraulicorbital, imagePaths.waterpump], // Thumbnails
    category: 'Hydraulic Systems', 
    description: 'Directional control valve for managing hydraulic fluid flow in industrial systems.',
    specialOffer: false, 
    popularSet: false, 
    hydraulicPart: true, 
    tractorBrands: false,// Added hydraulicPart: true
  },
  { 
    id: 21, 
    name: 'Hydraulic Gear Pump', 
    price: '$45', 
    imageUrl: imagePaths.hydraulicgearpum, 
    thumbnails: [imagePaths.hydraulicorbital, imagePaths.steeringknucckle, imagePaths.hmr37], // Thumbnails
    category: 'Hydraulic Systems', 
    specialOffer: false, 
    popularSet: false, 
    hydraulicPart: true,
    tractorBrands: false, // Added hydraulicPart: true
    description: 'High-efficiency hydraulic gear pump for consistent fluid circulation in machinery.' 
  },
  { 
    id: 22, 
    name: 'Hydraulic Cylinder', 
    price: '$55', 
    imageUrl: imagePaths.hydrauliccylinde, 
    thumbnails: [imagePaths.waterpump, imagePaths.airfilter, imagePaths.johndeere], // Thumbnails
    category: 'Hydraulic Systems', 
    specialOffer: false, 
    popularSet: false, 
    hydraulicPart: true,
    tractorBrands: false, // Added hydraulicPart: true
    description: 'Robust hydraulic cylinder designed for heavy-duty lifting and moving applications.' 
  },
  { 
    id: 23, 
    name: 'Hydraulic Orbital', 
    price: '$65', 
    imageUrl: imagePaths.hydraulicorbital, 
    thumbnails: [imagePaths.startersolenoid, imagePaths.oilfilter, imagePaths.gasterset], // Thumbnails
    category: 'Hydraulic Systems', 
    specialOffer: false, 
    popularSet: false, 
    hydraulicPart: true, 
    tractorBrands: false,// Added hydraulicPart: true
    description: 'Hydraulic orbital motor designed for precise and efficient fluid control in systems.' 
  },
  { 
    id: 24, 
    name: 'HMR 375 Hydraulic Motor Orbital', 
    price: '$65', 
    imageUrl: imagePaths.hmr37, 
    thumbnails: [imagePaths.airfilter, imagePaths.fuelinjector, imagePaths.hydraulicgearpum], // Thumbnails
    category: 'Hydraulic Systems', 
    specialOffer: false, 
    popularSet: false, 
    hydraulicPart: true,
    tractorBrands: false, // Added hydraulicPart: true
    description: 'High-performance hydraulic motor for orbital motion control and power transfer.' 
  },
  { 
    id: 25, 
    name: 'Spool 3 Hydraulic Control Valve', 
    price: '$65', 
    imageUrl: imagePaths.spool3, 
    thumbnails: [imagePaths.valves, imagePaths.waterpump, imagePaths.controlve], // Thumbnails
    category: 'Hydraulic Systems', 
    specialOffer: false, 
    popularSet: false, 
    hydraulicPart: true,
    tractorBrands: false, // Added hydraulicPart: true
    description: 'Spool 3 hydraulic control valve for regulating fluid flow in industrial systems.' 
  },
];

export const diesel: Product[] = [
  { 
    id: 26, 
    name: 'Diesel Injection Pump 393 398 390T 306', 
    price: '$25', 
    imageUrl: imagePaths.dieselpump, 
    thumbnails: [imagePaths.johndeere, imagePaths.airfilter, imagePaths.fuelinjector], // Thumbnails
    category: 'Fuel Systems', 
    specialOffer: false, 
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: true, // Added tractorBrands
    description: 'Diesel injection pump for efficient fuel delivery and engine performance.' 
  },
  { 
    id: 27, 
    name: 'Fuel Injection Pump 300 340 MEFIN', 
    price: '$35', 
    imageUrl: imagePaths.fuelinjection, 
    thumbnails: [imagePaths.hydraulicgearpum, imagePaths.startersolenoid, imagePaths.oilfilter], // Thumbnails
    category: 'Fuel Systems', 
    specialOffer: false, 
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: true, // Added tractorBrands
    description: 'Fuel injection pump for optimized fuel efficiency and emissions control.' 
  },
  { 
    id: 28, 
    name: 'Hydraulic Pump for Case IH Tractor C50', 
    price: '$45', 
    imageUrl: imagePaths.hydraulicgearpu, 
    thumbnails: [imagePaths.hydraulicorbital, imagePaths.valves, imagePaths.gasterset], // Thumbnails
    category: 'Hydraulic Systems', 
    specialOffer: false, 
    popularSet: false,
    hydraulicPart: true, // This is a hydraulic part, so true is set
    tractorBrands: true, // Added tractorBrands
    description: 'Durable hydraulic pump compatible with Case IH C50 tractor for reliable performance.' 
  },
  { 
    id: 29, 
    name: 'Hydraulic Filter Gearbox', 
    price: '$55', 
    imageUrl: imagePaths.hydraulicgearpump, 
    thumbnails: [imagePaths.hmr37, imagePaths.flywheel, imagePaths.priston], // Thumbnails
    category: 'Hydraulic Systems', 
    specialOffer: false, 
    popularSet: false,
    hydraulicPart: true, // This is a hydraulic part, so true is set
    tractorBrands: true, // Added tractorBrands
    description: 'Hydraulic filter for maintaining clean fluid flow and protecting machinery components.' 
  },
  { 
    id: 30, 
    name: 'Tie Rod Complete Ball Joint', 
    price: '$65', 
    imageUrl: imagePaths.airfilter, 
    thumbnails: [imagePaths.johndeere, imagePaths.controlve, imagePaths.clutch], // Thumbnails
    category: 'Suspension & Steering', 
    specialOffer: false, 
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: true, // Added tractorBrands
    description: 'Complete tie rod and ball joint set for enhanced suspension and steering performance.' 
  },
  { 
    id: 31, 
    name: 'Air Filter Set Interior Exterior', 
    price: '$65', 
    imageUrl: imagePaths.johndeere, 
    thumbnails: [imagePaths.hydraulicpump, imagePaths.startersolenoid, imagePaths.airfilter], // Thumbnails
    category: 'Engine Maintenance', 
    specialOffer: false, 
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: true, // Added tractorBrands
    description: 'Comprehensive air filter set for both interior and exterior filtration needs.' 
  },
];


export const imagegrid: Product[] = [
  { 
    id: 32, 
    name: 'Priston', 
    price: '$100', 
    category: 'Engine Components', 
    imageUrl: imagePaths.flywheel, 
    thumbnails: [imagePaths.controlve, imagePaths.valves, imagePaths.hydraulicgearpum], // Thumbnails
    description: 'High-quality flywheel for use in various engine components and systems.' ,
    specialOffer: false, 
    hydraulicPart: false,
    popularSet: false,
    tractorBrands: false,
  },
  { 
    id: 33, 
    name: 'Flywheel Engine', 
    price: '$200', 
    category: 'Engine Components', 
    imageUrl: imagePaths.priston, 
    thumbnails: [imagePaths.hydraulicorbital, imagePaths.clutch, imagePaths.brake], // Thumbnails
    description: 'Engine flywheel designed for enhanced engine operation and power transfer.' ,
    specialOffer: false, 
    hydraulicPart: false,
    popularSet: false,
    tractorBrands: false,
  },
  { 
    id: 34, 
    name: 'Clutch', 
    price: '$200', 
    category: 'Transmission & Powertrain', 
    imageUrl: imagePaths.clutch, 
    thumbnails: [imagePaths.flywheel, imagePaths.hmr37, imagePaths.waterpump], // Thumbnails
    description: 'Durable clutch for smooth gear shifting and enhanced transmission performance.' ,
    specialOffer: false, 
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: false,
  },
  { 
    id: 35, 
    name: 'Brake', 
    price: '$200', 
    category: 'Drivetrain & Control', 
    imageUrl: imagePaths.brake, 
    thumbnails: [imagePaths.hydraulicpump, imagePaths.oilfilter, imagePaths.gasterset], // Thumbnails
    description: 'High-performance brake components for better vehicle control and safety.' ,
    specialOffer: false, 
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: false,
  },
  { 
    id: 36, 
    name: 'Hydraulic', 
    price: '$200', 
    category: 'Drivetrain & Control', 
    imageUrl: imagePaths.hydraulic1, 
    thumbnails: [imagePaths.airfilter, imagePaths.priston, imagePaths.valves], // Thumbnails
    description: 'Hydraulic system components designed for optimal control and power distribution.' ,
    specialOffer: false, 
    popularSet: false,
    hydraulicPart: false,
    tractorBrands: false,
  },
];













