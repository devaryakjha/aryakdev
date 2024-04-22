export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Cipher Forge",
    description:
      "Generate secure and strong passwords effortlessly with CipherForge. Our free online password generator tool ensures your accounts remain protected against cyber threats.",
    image: "/images/projects/cipher_forge.webp",
    github: "https://cipher-forge.aryak.dev",
    color: "#666597",
  },
  {
    id: 2,
    title: "Project Varanasi",
    description:
      "This is a work-in-progress music streaming application built with Flutter for iOS, Android and macOs (Beta). The app is designed to have all the basic functionalities of a music app, with a UI heavily inspired by the Spotify mobile app.",
    image: "/images/projects/varanasi.webp",
    github: "https://github.com/devaryakjha/varanasi",
    color: "#C38D4F",
  },
  {
    id: 3,
    title: "Dictionary",
    description:
      "This user-friendly app offers cross-platform compatibility, enhances language learning with pronunciation audios, supports multiple parts of speech understanding, and optimizes offline access through audio file caching. Empowering efficient language learning with convenience and accuracy.",
    image: "/images/projects/dictionary.webp",
    github: "https://github.com/devaryakjha/dictionary",
    color: "#999AC6",
  },
  {
    id: 4,
    title: "BMI Calculator",
    description:
      "A Flutter app to calculate BMI visually. Users input height & weight, BMI is calculated using (weight / (height * height)). BMI value is displayed with a graphical representation of corresponding BMI range (underweight, normal weight, overweight, or obese). App also explains BMI & calculation methodology.",
    image: "/images/projects/bmi_calculator.webp",
    github: "https://github.com/devaryakjha/bmi_calculator",
    color: "#78A1BB",
  },
];
