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
    title: "Project Varanasi",
    description:
      "This is a work-in-progress music streaming application built with Flutter for iOS, Android and macOs (Beta). The app is designed to have all the basic functionalities of a music app, with a UI heavily inspired by the Spotify mobile app.",
    image: "/images/projects/varanasi.png",
    github: "https://github.com/logiclynxAJ/varanasi_mobile_app",
    color: "#C38D4F",
  },
  {
    id: 2,
    title: "Dictionary",
    description:
      "This user-friendly app offers cross-platform compatibility, enhances language learning with pronunciation audios, supports multiple parts of speech understanding, and optimizes offline access through audio file caching. Empowering efficient language learning with convenience and accuracy.",
    image: "/images/projects/dictionary.png",
    github: "https://github.com/devaryakjha/dictionary",
    color: "#999AC6",
  },
  {
    id: 3,
    title: "BMI Calculator",
    description:
      "A Flutter app to calculate BMI visually. Users input height & weight, BMI is calculated using (weight / (height * height)). BMI value is displayed with a graphical representation of corresponding BMI range (underweight, normal weight, overweight, or obese). App also explains BMI & calculation methodology.",
    image: "/images/projects/bmi_calculator.png",
    github: "https://github.com/devaryakjha/bmi_calculator",
    color: "#78A1BB",
  },
];
