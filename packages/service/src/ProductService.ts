import delay from "./delay";

export default function ProductService(){
    return {
        async getProducts(){
            await delay(4000);
            return database;
        },
        async getProductById(id:number){
          await delay(1000);
          return database.find(p => p.id == id) ?? null;
        }
    }
}

const database = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        image: "https://picsum.photos/id/1005/500/500", // Man taking photo
        description:
            "High-fidelity audio with noise-cancellation and a comfortable over-ear design. Perfect for travel or daily use.",
    },
    {
        id: 2,
        name: "Smartwatch with Heart Rate Monitor",
        image: "https://picsum.photos/id/1004/500/500", // Building
        description:
            "Track your fitness, receive notifications, and monitor your heart rate with this sleek and stylish smartwatch.",
    },
    {
        id: 3,
        name: "Portable Power Bank 20000mAh",
        image: "https://picsum.photos/id/1002/500/500", // City at night
        description:
            "Never run out of battery again with this high-capacity portable charger. Compatible with all USB devices.",
    },
    {
        id: 4,
        name: "USB-C to HDMI Adapter",
        image: "https://picsum.photos/id/1003/500/500", // Old-school camera
        description:
            "Connect your USB-C enabled laptop or phone to an HDMI display for presentations or entertainment.",
    },
    {
        id: 5,
        name: "Ergonomic Office Chair",
        image: "https://picsum.photos/id/1006/500/500", // Mountain road
        description:
            "Designed for maximum comfort and support during long working hours. Adjustable features for personalized ergonomics.",
    },
    {
        id: 6,
        name: "Mechanical Gaming Keyboard",
        image: "https://picsum.photos/id/1008/500/500", // Beach landscape
        description:
            "Responsive mechanical switches and customizable RGB lighting for an immersive gaming experience.",
    },
    {
        id: 7,
        name: "Stainless Steel Insulated Water Bottle",
        image: "https://picsum.photos/id/1009/500/500", // Hot air balloons
        description:
            "Keep your drinks hot for 12 hours or cold for 24 hours with this durable and eco-friendly water bottle.",
    },
    {
        id: 8,
        name: "Noise Cancelling Earbuds",
        image: "https://picsum.photos/id/1010/500/500", // Desert road
        description:
            "Compact and powerful earbuds with advanced noise cancellation technology for crystal-clear audio.",
    },
    {
        id: 9,
        name: "Wireless Charging Pad",
        image: "https://picsum.photos/id/1011/500/500", // Bicycle
        description:
            "Conveniently charge your compatible smartphone or earbuds without the need for cables.",
    },
    {
        id: 10,
        name: "Digital Art Tablet with Stylus",
        image: "https://picsum.photos/id/1012/500/500", // Forest road
        description:
            "Unleash your creativity with this high-resolution digital art tablet and pressure-sensitive stylus.",
    },
];
