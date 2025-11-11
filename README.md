# Game-Of-Thrones: A Tribute to Emilia Clarke
### "In the halls of code and fire, the Mother of Dragons still reigns."

Picture a Westerosi playbill written for techies: Fire up the site and you’re greeted by sweeping visuals, lore-rich sections, and a maester-on-demand chatbot. Step into the Lookalike Cam and a TensorFlow-powered sentry studies your visage, compares it against a handcrafted roster of characters, then unveils the champion you most resemble—complete with animated fanfare. It’s cosplay energy without the costume change.

>  This project is a fan-crafted ode to Emilia Clarke—our eternal Daenerys—blending cinematic reverence with playful machine learning. Wander through immersive pages, trade stories with a lore-wise chatbot, and let the Lookalike Cam summon your closest counterpart from the great houses of Westeros.

## Features of the Realm
- **Lookalike Cam:** A TensorFlow sentinel studies each visitor and reveals their most kindred Game of Thrones character, complete with portraits and match lore.
- **Storybook Landing:** Animated sections and 3D splashes retell key victories and alliances across the Seven Kingdoms.
- **Maester Chat:** A Cohere-powered scribe answers questions, shares trivia, and guides travelers through the saga’s tapestry.

## Arsenal of the Citadel
- Next.js 13+
- MongoDB
- Cohere LLM chatbot
- SSD-Mobilenet + FaceNet weights
- TensorFlow.js with `@vladmandic/face-api` (Node backend for face recognition)
- Framer Motion & Tailwind CSS for sweeping visuals

## How the Magic Works
1. **Model Warm-Up:** The backend boots, binds TensorFlow’s native backend, and loads the face recognition, landmark, and detection models from `backend/models/`.
2. **Embeddings Ready Room:** Precomputed descriptors live in `character_embeddings.json`. Each entry records the character’s name, normalized embedding, timestamp, and the public image path used in the UI.
3. **Camera Ritual:** The client captures a frame, sends a JPEG payload to `/api/match`, and awaits the maester’s scroll.
4. **Matchmaking:** Descriptors are normalized, distances computed, and the best houses returned with similarity scores and portrait references.
5. **Reveal & Rematch:** The frontend animates the chosen champion’s image, keeps a short match history, and lets the user retry without refreshing.

## Saga of the Experience
Step onto the site and you’re greeted like a returning bannerman—hero shots of Emilia sparkle, banners ripple with house colors, and the soundtrack of flickering animations draws you deeper. Accept the challenge of the Lookalike Cam, unveil your noble twin, and share the tale with fellow fans. The Mother of Dragons may have left the screen, but here her spirit, courage, and warmth ignite every interaction.

<!--![Screenshot (418)](https://github.com/user-attachments/assets/dbdb705c-17dc-4f31-ac37-345891f28bf0) -->
![Screenshot (417)](https://github.com/user-attachments/assets/f2e9f1de-2e03-4c12-a8b3-a27a9c871013)

![Screenshot (416)](https://github.com/user-attachments/assets/c86dc7eb-d19d-4526-9a98-6d46701d36e0)
