import User from "../models/UserSchema.js";
import transporter from "./Nodemailer.js";

const UserController = {
  async createUser(req, res) {
    try {
      const { name, email, phone } = req.body;

      const newUser = new User({ name, email, phone });
      const savedUser = await newUser.save();

      const welcomeEmail = {
        from: "gramtest60@gmail.com",
        to: email,
        subject: "Welcome to WatchDive",
        html: `
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Email Template</title>
        <style>
            /* Add your CSS styles here */
            .bg-white {
                background-color: #ffffff;
            }
    
            /* Add more styles as needed */
        </style>
    </head>
    
    <body class="bg-white my-auto mx-auto font-sans">
        <div class="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <div class="mt-[32px]">
                <img src="https://ksr-ugc.imgix.net/assets/027/297/162/1040f11f9794575082f8491fd87d6809_original.png?ixlib=rb-4.1.0&w=680&fit=max&v=1574361458&gif-q=50&lossless=true&s=04927970cfbf590232da8ad2ddf2760e" alt="Vercel" width="350" height="100" style="display: block; margin: 0 auto;">
            </div>
            <p class="text-black text-[14px] leading-[24px] text-center">
                Dear <strong>${name}</strong>,
            </p>
            <p class="text-black text-[14px] leading-[24px] text-center">
                <strong><a href="https://en.diveroid.com/" class="text-black">Diveroid</a></strong> has invited you to join in Unveiling Something Extraordinary:
                <strong><a href="https://www.kickstarter.com/" class="text-black">Kickstarter</a></strong> Launch in <strong>February!</strong>
            </p>
            <div class="text-center mt-[32px] mb-[32px]">
                <a href="https://www.kickstarter.com/projects/officialdiveroid" class="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center py-3 px-5" style="text-decoration: none;">Join the Project</a>
            </div>
            // <div>


            // <img src="https://ksr-ugc.imgix.net/assets/027/235/396/871b5f757e7a3149330a41d461c921c4_original.gif?ixlib=rb-4.1.0&w=680&fit=max&v=1573902178&gif-q=50&q=92&s=425dab9e62c49ff083afae34eba00c1a"/>
            // </div>
            <p class="text-black text-[14px] leading-[24px]">
                or copy and paste this URL into your browser:
                <a href="https://www.kickstarter.com/projects/officialdiveroid" class="text-blue-600 no-underline">https://www.kickstarter.com/projects/officialdiveroid</a>
            </p>
            <hr class="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full">
            <p class="text-[#666666] text-[12px] leading-[24px]">
                This invitation was intended for <span class="text-black">Diver</span>. This invite was sent from
                <span class="text-black">124.20.12.12</span> located in <span class="text-black">Korea</span>. If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us.
            </p>
        </div>
    </body>
    
        </html>
    `,
      };

      transporter.sendMail(welcomeEmail, (error, info) => {
        if (error) {
          console.error("Error sending welcome email:", error);
          res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Welcome email sent:", info.response);
          res.status(201).json(savedUser);
        }
      });

      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default UserController;
