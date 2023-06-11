# TDEE Calorie Calculator

This TDEE (Total Daily Energy Expenditure) calorie calculator is an improved version of the Harris-Benedict equations. It introduces new equations that estimate the Resting Metabolic Rate (RMR) in adults of various weights while considering the same anthropometric factors.

## Background

The original Harris-Benedict equations, published in 1918, provided a basis for estimating RMR in individuals. However, these equations have become outdated over time. This calculator addresses the limitations of the Harris-Benedict equations by developing and validating new equations for estimating RMR in normal, overweight, and obese adult subjects while using the same anthropometric parameters.

## Methodology

To improve the accuracy of RMR estimation, this calculator utilized a comparison between RMR measurements and values obtained from different equations, including the new equations, the Harris-Benedict equations, the Mifflin-St Jeor equation, the FAO/WHO/UNU equation, and the Owen equation. The new predictive RMR equations were developed by considering age, body weight, height, and sex parameters.

The revised RMR equations are as follows:

- RMR for males: (9.65 × weight in kg) + (573 × height in m) - (5.08 × age in years) + 260
- RMR for females: (7.38 × weight in kg) + (607 × height in m) - (2.31 × age in years) + 43
- RMR for males (alternate): (4.38 × weight in pounds) + (14.55 × height in inches) - (5.08 × age in years) + 260
- RMR for females (alternate): (3.35 × weight in pounds) + (15.42 × height in inches) - (2.31 × age in years) + 43

## Results and Accuracy

The accuracy of the new equations was tested against RMR measurements in a test group, comparing them with the other equations using the same anthropometric variables. The new equations demonstrated more accurate results, with the equation for males exhibiting better predictive ability (R-squared: 0.95) than the equation for females (R-squared: 0.86). The new equations displayed good accuracy at both the group and individual levels, offering improved reliability compared to other equations that use the same anthropometric variables as predictors of RMR.

It is important to note that the new equations were developed under modern obesogenic conditions and consider individuals with regulated Westernized diseases (such as cardiovascular disease, diabetes, and thyroid disease), making them more applicable to diverse populations.

## Getting Started

To use the TDEE Calorie Calculator, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/caloric-intake-calculator.git`
2. Navigate to the project directory: `cd caloric-intake-calculator`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your web browser and visit `http://localhost:3000` to access the application.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to explore, modify, and use this code as per the terms of the license.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a new issue or submit a pull request.

## Acknowledgements

- The original Harris JA Benedict FG research paper: "A Biometric Study of Human Basal Metabolism." The Proceedings of the National Academy of Sciences (PNAS) (1918).
- Dr. Eleni Pavlidou, Department of Food Science and Nutrition, School of Environment, University of the Aegean, 81400 Myrina, Lemnos, Greece, for creating the Pavlidou Equation.
- [Revised Harris-Benedict Equation: New Human Resting Metabolic Rate Equation](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9967803/): The research article detailing the revised Harris-Benedict equations.

---

Feel free to customize this README file to suit your specific project.
