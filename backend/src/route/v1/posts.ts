import { Hono } from "hono";
import { createPrisma } from "../../lib/prisma";
import authMiddleware from "../../middlewares/authMiddleware";
import { HfInference } from "@huggingface/inference"; // Import Hugging Face SDK
import { OpenAI } from "openai";

const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

// const client = new HfInference("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");

const client = new OpenAI({
  baseURL: "https://api-inference.huggingface.co/v1/",
  apiKey: "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",
});

// Add route to fix grammar
postRouter.post("/fix", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const textToFix = body.text; // Text to be corrected

    // Prepend a dynamic instruction to guide the model
    const instruction = "Please correct the grammar of the following text:";
    const fullText = `${instruction} ${textToFix}`;
    console.log(fullText);
    // Call the Hugging Face API for grammar correction
    const chatCompletion = await client.chat.completions.create({
      model: "google/gemma-2-9b-it", // Use the model of your choice
      messages: [
        {
          role: "user",
          content: fullText,
        },
      ],
      max_tokens: 500,
    });

    const correctedText = chatCompletion.choices[0].message.content; // Extract corrected text
    console.log(correctedText);
    return c.json({
      message: "Grammar fixed successfully",
      correctedText,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error in fixing grammar:", e.message); // Access the message properly
    } else {
      console.error("Unknown error occurred", e); // If e is not an instance of Error, log it
    }
    return c.json({
      message: "Error in fixing grammar",
      error: e instanceof Error ? e.message : "Unknown error",
    });
  }
});

// Route for generating article based on topic query
postRouter.post("/generate-article", authMiddleware, async (c) => {
  try {
    // Get the topic from the request body
    const body = await c.req.json();
    const topic = body.topic; // Extract the topic

    if (!topic) {
      return c.json({
        message: "Topic is required",
      });
    }

    // Generate an article with the given topic
    const articlePrompt = `Write a comprehensive and engaging article on the topic of "${topic}". The article should be well-structured with the following sections:

      1. **Introduction**: Provide a brief overview of the topic, explaining its relevance and importance.
      2. **Body**: Break the content into sub-sections that cover different aspects of the topic. Make sure to include:
        - Key concepts or definitions, if applicable
        - Major developments or trends, if applicable
        - Real-world applications or case studies, if applicable
        - Challenges or controversies, if applicable
        - If none of these sections apply, please add any concepts or details that you feel are most relevant to the article. Ensure that the article is well-rounded and comprehensive.

      3. **Conclusion**: Summarize the key points discussed and offer insights or predictions for the future of the topic.

      Ensure the tone is informative, clear, and professional, and make the content engaging for a wide audience. Use examples, data, or references where appropriate to support key arguments. The article should be approximately 600-800 words long.`;

    // Call the Hugging Face API for text generation
    const chatCompletion = await client.chat.completions.create({
      model: "google/gemma-2-9b-it",
      messages: [
        {
          role: "user",
          content: articlePrompt,
        },
      ],
      max_tokens: 800, //Max length of the article
    });

    const generatedArticle = chatCompletion.choices[0].message.content; // Extracting the generated article

    return c.json({
      message: "Article generated successfully",
      article: generatedArticle, // Returning the generated article
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error writing article:", e.message); // Access the message properly
    } else {
      console.error("Unknown error occurred", e);
    }
    return c.json({
      message: "Error writing article",
      error: e instanceof Error ? e.message : "Unknown error",
    });
  }
});

postRouter.post("/summarize", authMiddleware, async (c) => {
  try {
    // Get the description from the request body
    const body = await c.req.json();
    const description = body.description; // Extract the description

    if (!description) {
      return c.json({
        message: "Description is required",
      });
    }

    // Generate a summary with the given description
    const summaryPrompt = `Summarize the following content into a short paragraph:

      "${description}"

      The summary should be concise, informative, and capture the main points of the content.`;

    console.log("summaryPrompt", summaryPrompt);
    // Call the Hugging Face API for text summarization
    const chatCompletion = await client.chat.completions.create({
      model: "google/gemma-2-9b-it", // You can change the model as needed
      messages: [
        {
          role: "user",
          content: summaryPrompt,
        },
      ],
      max_tokens: 500, // Limiting the summary length
    });

    const summarizedContent = chatCompletion.choices[0].message.content; // Extract the summarized content

    return c.json({
      message: "Content summarized successfully",
      summary: summarizedContent, // Returning the summarized content
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error summarizing content:", e.message); // Access the message properly
    } else {
      console.error("Unknown error occurred", e);
    }
    return c.json({
      message: "Error summarizing content",
      error: e instanceof Error ? e.message : "Unknown error",
    });
  }
});

// Fetch a single post by id in params
postRouter.get("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = createPrisma(c.env);

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!post) {
      return c.json({
        message: "Post not found",
      });
    }
    console.log(post);

    return c.json({
      message: "Post fetched successfully",

      post,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

// Fetch all posts
postRouter.get("/", async (c) => {
  try {
    const prisma = createPrisma(c.env);
    const posts = await prisma.post.findMany();
    if (!posts) {
      return c.json({
        message: "No posts found",
      });
    }
    return c.json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

// Add a new post
postRouter.post("/post", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const prisma = createPrisma(c.env);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        authorId: c.get("userId"),
      },
    });

    return c.json({
      message: "Post added successfully",
      post: {
        title: post.title,
        description: post.description,
      },
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

// Update a post
postRouter.put("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = createPrisma(c.env);

    const body = await c.req.json();

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) {
      return c.json({
        message: "Post not found",
      });
    }
    if (post.authorId !== c.get("userId")) {
      return c.json({
        message: "You are not authorized to update this post",
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return c.json({
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

export default postRouter;
