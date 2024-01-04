# Jingle Quest

Welcome to the Treasure Hunt Website! This interactive web application is designed for a thrilling treasure hunt experience on your campus. Participants will explore the campus, solve clues, and uncover hidden alpha-numeric codes. The challenge also involves scanning QR codes to add an extra layer of excitement. The player with the minimum time to find all the codes and QR codes will emerge victorious!

## How to Play

1. Visit the website and log in or sign up to create an account.
2. After signing up, check the 'Instructions' page for general rules and guidelines. The timer will start when you click 'Start' on this page.
3. Navigate through the campus, following the hints provided on the website to locate hidden alpha-numeric codes.
4. Enter the discovered codes on the 'Scan' page, where you can also find hints for the next location.
5. Use a connected QR code scanning website to complete the challenge. The 'Check' page allows you to verify the completion of QR code scans.
6. Once all codes and QR codes are found, the 'Completion' page will celebrate your victory!

## About the Website

The Treasure Hunt Website is built using Next.js (App router), providing a seamless and responsive user interface. Firebase is used for user authentication and as the database, ensuring secure and efficient data handling.

### Pages

1. **Home**: The landing page where participants learn about the game and get started.
2. **Login**: Allows registered users to log in to their accounts.
3. **Signup**: New participants can create accounts to join the treasure hunt.
4. **Instructions**: Displays general rules and guidelines for the game. The timer starts when you click 'Start.'
5. **Scan**: The primary page for entering alpha-numeric codes and receiving hints for the next locations.
6. **Check**: Verifies the completion of QR code scans on the connected website.
7. **Completion**: Displays congratulations when a player successfully completes the game.

## How to Run Locally

To run the Treasure Hunt Website locally on your machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/niranjan-official/jingle-quest.git
```

2. Navigate to the project directory:

```bash
cd jingle-quest
```

3. Install dependencies:

```bash
npm install
```

4. Set up Firebase credentials:
   - Create a Firebase project and obtain the configuration details.
   - Replace the Firebase configuration in the project with your credentials.

5. Run the development server:

```bash
npm run dev
```

6. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the Treasure Hunt Website.

Now you can enjoy the treasure hunt experience right on your localhost!

Feel free to contribute to the project, report issues, or suggest improvements. Happy hunting!
