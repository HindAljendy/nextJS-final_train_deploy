import * as z from "zod";


/* ZOD V.4 */

// create article Schema:
export const createArticleSchema = z.object({
  title: z
    .string({
      error: (issue) => issue.input === undefined || issue.input === null || issue.input === ""
        ? "This field  title is required"
        : "field  title Not a string"
    })

    .min(2, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Value must be >${issue.minimum}`
        }
      }
    })

    .max(200, {
      error: (issue) => {
        if (issue.code === "too_big") {
          return ` Title Value must be <${issue.maximum}`
        }
      }
    }),

  description: z
    .string({
      error: (issue) => issue.input === undefined || issue.input === null || issue.input === ""
        ? "This field  description is required"
        : "field  description Not a string"
    })
    .min(10, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Description Value must be >${issue.minimum}`
        }
      }
    })
});

// Register  Schema:
export const registerSchema = z.object({
  username: z.string().min(2).max(100),
  email: z.email().min(3).max(200),
  password: z.string().min(6),
  isAdmin: z.boolean().optional()
});

// LogIn  Schema:
export const loginSchema = z.object({
  email: z.email({
    error: (issue) => issue.input === undefined || issue.input === null || issue.input === ""
      ? "This Field  email is required"
      : "Field  email Not a email"
  })
    .min(3).max(100),
  password: z.string().min(6)
})

// Update user profile  Schema:
export const UserProfileUpdatedSchema = z.object({
  username: z.string().min(2).max(100).optional(),
  email: z.email().min(3).max(200).optional(),
  password: z.string().min(6).optional()
});

// Create Comment Schema:
export const CreateCommentSchema = z.object({
  text: z.string().min(2).max(100),
  articleId: z.number(),
});

// update Comment Schema:
export const UpdateCommentSchema = z.object({
  text: z.string().min(2).max(100),
});

/* EXAMPLES :

/*ZOD V.3
export const createArticleSchema = z.object({
    title: z.string("It must be string").min(2, "It must be at least two characters ").max(200),
    description: z.string().nonempty("It cannot be empty").min(10)
}); */

/* export const createArticleSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title should be of type String"
    })
    .min(2 , {message: "Title should be at least 2 characters long"})
    .max(200 , {message : "Title should be less than 200 characters "}),

    description: z.string().nonempty("It cannot be empty").min(10)
});

/*ZOD V.4
1. email:
const emailSchema = z.email({
  error: (issue) => {
    if (issue.code === 'invalid_type') {
      return "Not a string";
    } else if (issue.code === 'invalid_string') {
      return "This field is required";
    } else if (issue.code === 'invalid_email') {
      return "Please enter a valid email address";
    } else {
      return "Invalid input";
    }
  },
});

const schema = z.object({
  email: emailSchema,
});


2.password 
 password: z.string({
    error: (issue) => {
      if (issue.code === 'invalid_type') {
        return "Not a string";
      } else if (issue.code === 'invalid_string') {
        return "This field is required";
      } else {
        return "This field is required";
      }
    },
  })
  .min(8, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return "Password must be at least 8 characters long";
      } else if (issue.code === 'invalid_type') {
        return "Not a string";
      } else if (issue.code === 'invalid_string') {
        return "This field is required";
      } else {
        return "Invalid input";
      }
    },
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
    error: (issue) => {
      if (issue.code === 'invalid_type') {
        return "Not a string";
      } else if (issue.code === 'regex') {
        return "Password must contain at least one uppercase letter";
      } else {
        return "Invalid input";
      }
    },
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
    error: (issue) => {
      if (issue.code === 'invalid_type') {
        return "Not a string";
      } else if (issue.code === 'regex') {
        return "Password must contain at least one lowercase letter";
      } else {
        return "Invalid input";
      }
    },
  })
  .regex(/[0-9]/, {
    message: "Password must contain at least one number",
    error: (issue) => {
      if (issue.code === 'invalid_type') {
        return "Not a string";
      } else if (issue.code === 'regex') {
        return "Password must contain at least one number";
      } else {
        return "Invalid input";
      }
    },
  }),







  
.nonempty({
    error: () => "هذا الحقل مطلوب"
})
.email({
    error: () => "البريد الإلكتروني غير صحيح"
})

*/