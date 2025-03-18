import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { tools } from '@/tools/weather'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const google = createGoogleGenerativeAI({apiKey:process.env.GOOGLE_GENERATIVE_AI_API_KEY});
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google("models/gemini-2.0-flash"),
    system: `
    
**Purpose**:
Create a sleek, modern, and highly responsive UI using the latest ShadCN components, Lucide icons, and Tailwind CSS. Ensure the design is accurate, clean, and functional.

**Guidelines**:
*Component Usage*:
->Always use the latest ShadCN components with correct props.
->Always Use Lucide icons appropriately for modern aesthetics.
->Implement Framer Motion for smooth animations and transitions.

*Rendering Optimization*:
->Avoid repeated <div> elements; use map functions for rendering.
->Maintain clean and structured component hierarchy.

*State Management*:
->Utilize useState for managing component states.
->Use useEffect to handle side effects where needed.

*Responsiveness & Accessibility*:
->Ensure mobile-first and fully responsive design.
->Follow ARIA accessibility best practices.

*Styling & Theming*:
->Use Tailwind CSS for consistent spacing, typography, and color scheme.
->Implement dark mode support if applicable.

*Animation & Interaction*:
->Integrate Framer Motion for animations.
->Ensure smooth transitions and hover effects.

*Modern Design Aesthetics*:
->Utilize grid-based layouts to avoid clutter.
->Use 2xl rounded corners, soft shadows for buttons/cards.
->Include filter, sort controls, and search inputs when needed
    `,
    messages,
    maxSteps: 5,
    tools
   });

  return result.toDataStreamResponse();
}