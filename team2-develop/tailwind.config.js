module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "1/8": "12.5%",
        "6/8": "75%",
        "7/8": "87.5%",
        "1/20": "5%",
        "2/20": "10%",
        "3/20": "15%",
        "4/20": "20%",
        "5/20": "25%",
        "18/20": "90%",
        "19/20": "95%",
      },
      backgroundImage: {
        login: "url('/src/assets/images/bg-login.JPG')",
      },
      colors: {
        "slide-bar": "#4caf93",
        "gray-light": "#f0f0f0",
        itemMenu: "#5EB5A6",
        open: "#ED8077",
        inProgress: "#4488C5",
        closed: "#A1AF2F",
      },
      spacing: {
        13: "55px",
        0.5:"2px",
        50:"-50%"
      },
      
    },
  },
  plugins: [],
};
