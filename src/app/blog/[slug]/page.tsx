'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Monitor, Palette, Sun, Eye, Clock, ArrowRight, List } from 'lucide-react';
// import { Metadata } from 'next'; // While you import this, Next.js 13/14 recommends using the metadata object in route.js/ts for SEO instead of Head.  I'll address both.
import Head from 'next/head';

type Post = {
  title: string;
  date: string;
  category: string;
  readTime: string;
  icon: React.ReactElement;
  content: {
    intro: string;
    sections: Array<{
      type: string;
      title: string;
      content?: string;
      headers?: string[];
      rows?: string[][];
      items?: Array<{ title: string; description: string }>;
      level?: 'low' | 'medium' | 'high';
    }>;
  };
  tool?: {
    name: string;
    description: string;
    link: string;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
};

const posts: Record<string, Post> = {
  'how-to-spot-and-fix-dead-pixels': {
    title: 'How to Spot and Fix Dead Pixels on Your Screen',
    date: 'February 23, 2025',
    category: 'Screen Issues',
    readTime: '3 min read',
    icon: <Monitor className="w-6 h-6" />,
    content: {
      intro: "Dead pixels—those tiny, lifeless dots on your screen—can be a real nuisance. Whether you're gaming, editing photos, or binge-watching, they disrupt your experience. Let's dive into what they are, how to find them, and what you can do about them.",
      sections: [
        {
          type: 'section',
          title: 'Understanding Dead Pixels',
          content: "A dead pixel is a picture element (pixel) in an LCD screen that no longer functions properly. Unlike stuck pixels, which remain permanently lit in one color, dead pixels appear as black dots because they fail to receive power or signal.",
        },
        {
          type: 'table',
          title: 'Types of Pixel Defects',
          headers: ['Type', 'Appearance', 'Cause', 'Fixability'],
          rows: [
            ['Dead Pixel', 'Black dot', 'No power/signal', 'Hard to fix'],
            ['Stuck Pixel', 'Colored dot', 'Transistor issue', 'Sometimes fixable'],
            ['Hot Pixel', 'Always white', 'Constant signal', 'May be temporary'],
            ['Subpixel defect', 'Color tint', 'RGB element issue', 'Varies'],
          ],
        },
        {
          type: 'list',
          title: 'Common Causes',
          items: [
            {
              title: 'Manufacturing Defects',
              description: 'Issues during production can lead to pixel failures',
            },
            {
              title: 'Physical Damage',
              description: 'Impact or pressure can damage pixel components',
            },
            {
              title: 'Age-Related Wear',
              description: 'Natural degradation over time',
            },
            {
              title: 'Electrical Issues',
              description: 'Power surges or controller problems',
            },
          ],
        },
        {
          type: 'severity',
          title: 'Impact Assessment',
          content: "The severity of dead pixels depends on their location and quantity:",
          level: 'medium',
        },
      ],
    },
    tool: {
      name: 'Dead Pixel Test',
      description: "Use our free Dead Pixel Test to check your screen for dead or stuck pixels.",
      link: '/tests/dead-pixel'
    },
    seo: {
      title: 'Spot and Fix Dead Pixels: Guide, Test, and Solutions',
      description: 'Comprehensive guide on identifying and fixing dead pixels on your screen. Includes free dead pixel test tool and troubleshooting tips.',
      keywords: ['dead pixel', 'stuck pixel', 'fix dead pixel', 'dead pixel test', 'screen repair', 'monitor issues'],
    },
  },
  'why-color-accuracy-matters': {
    title: 'Why Color Accuracy Matters for Designers and Gamers',
    date: 'February 24, 2025',
    category: 'Color Quality',
    readTime: '4 min read',
    icon: <Palette className="w-6 h-6" />,
    content: {
      intro: "Color accuracy isn't just about making things look pretty—it's about seeing things as they're meant to be seen. For designers, it's crucial for brand consistency. For gamers, it's about experiencing games as developers intended.",
      sections: [
        {
          type: 'section',
          title: 'The Importance of Color Accuracy',
          content: "Color accuracy ensures that what you see on your screen matches reality as closely as possible. This is crucial for various professionals and enthusiasts who rely on precise color representation.",
        },
        {
          type: 'table',
          title: 'Color Accuracy Metrics',
          headers: ['Metric', 'Description', 'Ideal Value', 'Importance'],
          rows: [
            ['Delta E', 'Color difference', '< 2.0', 'Critical'],
            ['Gamut Coverage', 'Color range', '> 95% sRGB', 'High'],
            ['Color Temp', 'White point', '6500K', 'Medium'],
            ['Gamma', 'Brightness curve', '2.2', 'High'],
          ],
        },
        {
          type: 'list',
          title: 'Who Needs Color Accuracy?',
          items: [
            {
              title: 'Graphic Designers',
              description: 'Ensure brand colors are consistent across all media',
            },
            {
              title: 'Photographers',
              description: 'Edit photos to match real-world colors',
            },
            {
              title: 'Video Editors',
              description: 'Maintain color consistency throughout footage',
            },
            {
              title: 'Gamers',
              description: 'Experience games with intended artistic vision',
            },
          ],
        },
        {
          type: 'severity',
          title: 'Impact on Work Quality',
          content: "Poor color accuracy can severely impact professional work:",
          level: 'high',
        },
      ],
    },
    tool: {
      name: 'Color Accuracy Test',
      description: "Check your display's color accuracy with our professional testing tool.",
      link: '/tests/color-accuracy'
    },
    seo: {
      title: 'Color Accuracy: Why It Matters for Design, Gaming, and Professionals',
      description: 'Explore the importance of color accuracy for designers, gamers, and other professionals. Learn about color metrics and test your display with our tool.',
      keywords: ['color accuracy', 'color calibration', 'display accuracy', 'design color', 'gaming color', 'Delta E', 'color gamut'],
    },
  },
  'backlight-bleed-explained': {
    title: 'Backlight Bleed: What It Is and How to Test for It',
    date: 'February 25, 2025',
    category: 'Display Quality',
    readTime: '3 min read',
    icon: <Sun className="w-6 h-6" />,
    seo: {
      title: 'Backlight Bleed: Complete Guide to Testing and Fixing LCD Screen Issues',
      description: 'Learn how to identify, test, and fix backlight bleed on your LCD screen. Complete guide with step-by-step instructions and professional testing tools.',
      keywords: ['backlight bleed', 'LCD screen test', 'monitor testing', 'screen quality', 'display testing', 'IPS glow'],
    },
    content: {
      intro: "Backlight bleed occurs when light from your LCD's backlight leaks around the edges of the screen. While some amount is normal, excessive bleeding can impact your viewing experience, especially in dark scenes.",
      sections: [
        {
          type: 'section',
          title: 'Understanding Backlight Bleed',
          content: "Backlight bleed is a common issue in LCD displays where light leaks through the edges or corners of the screen. It's most noticeable when viewing dark content in a dim environment.",
        },
        {
          type: 'table',
          title: 'Types of Backlight Bleed',
          headers: ['Type', 'Appearance', 'Common Location', 'Severity'],
          rows: [
            ['Corner Bleed', 'Bright corners', 'Screen corners', 'Varies'],
            ['Edge Glow', 'Uniform edge light', 'Screen edges', 'Usually minor'],
            ['Clouding', 'Uneven patches', 'Screen center', 'Can be severe'],
            ['IPS Glow', 'Angle-dependent', 'Corners', 'Normal for IPS'],
          ],
        },
        {
          type: 'list',
          title: 'Testing Methods',
          items: [
            {
              title: 'Dark Room Test',
              description: 'View a black screen in a dark environment',
            },
            {
              title: 'Brightness Check',
              description: 'Test at different brightness levels',
            },
            {
              title: 'Viewing Angle Test',
              description: 'Check bleed from different angles',
            },
            {
              title: 'Content Impact',
              description: 'Assess effect on movies and games',
            },
          ],
        },
        {
          type: 'severity',
          title: 'When to Be Concerned',
          content: "The severity of backlight bleed can vary:",
          level: 'medium',
        },
      ]
    },
    tool: {
      name: 'Backlight Bleed Test',
      description: "Test your screen for backlight bleeding using our specialized tool.",
      link: '/tests/backlight-bleed'
    },
  },
  'viewing-angles-explained': {
    title: 'Viewing Angles Explained: Why Your Screen Type Matters',
    date: 'February 26, 2025',
    category: 'Screen Technology',
    readTime: '3 min read',
    icon: <Eye className="w-6 h-6" />,
    content: {
      intro: "Viewing angles determine how well your screen maintains image quality when viewed from different positions. The type of panel technology used in your display directly affects its viewing angle performance.",
      sections: [
        {
          type: 'section',
          title: 'Understanding Viewing Angles',
          content: "A display's viewing angle is the maximum angle at which the screen can be viewed with acceptable visual performance. Different panel types offer varying levels of viewing angle performance.",
        },
        {
          type: 'table',
          title: 'Panel Type Comparison',
          headers: ['Panel Type', 'Viewing Angle', 'Color Shift', 'Best Use'],
          rows: [
            ['IPS', '178°', 'Minimal', 'Professional work'],
            ['VA', '178°', 'Moderate', 'Entertainment'],
            ['TN', '170°', 'Significant', 'Gaming'],
            ['OLED', '180°', 'None', 'High-end displays'],
          ],
        },
        {
          type: 'list',
          title: 'Key Considerations',
          items: [
            {
              title: 'Color Consistency',
              description: 'How colors appear from different angles',
            },
            {
              title: 'Brightness Shift',
              description: 'Changes in perceived brightness',
            },
            {
              title: 'Contrast Stability',
              description: 'Maintenance of contrast ratio',
            },
            {
              title: 'Use Case',
              description: 'Intended application of the display',
            },
          ],
        },
        {
          type: 'severity',
          title: 'Impact on Usage',
          content: "Poor viewing angles can significantly affect:",
          level: 'high',
        },
      ],
    },
    tool: {
      name: 'Viewing Angle Test',
      description: "Evaluate your display's viewing angles with our comprehensive test.",
      link: '/tests/viewing-angle'
    },
  },
  'response-time-key-to-smooth-gaming': {
    title: 'Response Time: The Key to Smooth Gaming and Video',
    date: 'February 27, 2025',
    category: 'Gaming',
    readTime: '3 min read',
    icon: <Clock className="w-6 h-6" />,
    content: {
      intro: "Response time measures how quickly a pixel can change from one color to another. Fast response times are crucial for smooth motion in gaming and video playback, reducing motion blur and ghosting effects.",
      sections: [
        {
          type: 'section',
          title: 'Understanding Response Time',
          content: "Response time is measured in milliseconds (ms) and indicates how quickly pixels can transition. Lower numbers mean better performance, with gaming monitors often targeting 1ms response times.",
        },
        {
          type: 'table',
          title: 'Response Time Comparison',
          headers: ['Panel Type', 'Typical Response', 'Gaming Suitable?', 'Motion Blur'],
          rows: [
            ['TN', '1ms', 'Excellent', 'Minimal'],
            ['IPS', '4-8ms', 'Good', 'Low'],
            ['VA', '4-10ms', 'Moderate', 'Noticeable'],
            ['OLED', '<1ms', 'Excellent', 'None'],
          ],
        },
        {
          type: 'list',
          title: 'Impact on Gaming',
          items: [
            {
              title: 'Motion Clarity',
              description: 'Affects smoothness of moving images',
            },
            {
              title: 'Competitive Gaming',
              description: 'Critical for fast-paced games',
            },
            {
              title: 'Visual Artifacts',
              description: 'Can cause ghosting or smearing',
            },
            {
              title: 'Input Lag',
              description: 'Contributes to overall responsiveness',
            },
          ],
        },
        {
          type: 'severity',
          title: 'Gaming Performance Impact',
          content: "The impact of response time on gaming:",
          level: 'high',
        },
      ],
    },
    tool: {
      name: 'Response Time Test',
      description: "Measure your screen's response time with our professional testing tool.",
      link: '/tests/response-time'
    },
  },
};

function formatContent(content: string) {
  return content.split('\n').map((line, index) => {
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl font-semibold text-white mt-8 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
    }
    if (line.startsWith('### ')) {
      return (
        <h3 key={index} className="text-xl font-semibold text-white mt-6 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
    }
    if (line.trim().length === 0) {
      return <div key={index} className="h-4" />;
    }
    return (
      <p key={index} className="text-gray-300 mb-4">
        {line.trim()}
      </p>
    );
  });
}

function SeverityBadge({ severity }: { severity: 'low' | 'medium' | 'high' }) {
  const colors = {
    low: 'bg-green-400/10 text-green-400 border-green-400/20',
    medium: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    high: 'bg-red-400/10 text-red-400 border-red-400/20'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[severity]}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}

function TableSection({ headers, rows }: { headers: string[], rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 bg-gray-800/50">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="text-left py-4 px-6 bg-gray-800/50 text-white font-semibold border-b border-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-700 last:border-0 hover:bg-gray-800/30 transition-colors">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-4 px-6 text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListSection({ items }: { items: { title: string, description: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70 transition-colors">
          <div className="flex-shrink-0 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <List className="w-5 h-5 text-blue-400" />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-white">{item.title}</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Section({ title, content }: { title: string, content: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="text-gray-300 leading-relaxed">{content}</p>
    </div>
  );
}

function BlogContent({ content }: { content: any }) {
  if (typeof content === 'string') {
    return <p className="text-gray-300">{content}</p>;
  }

  return (
    <div className="space-y-12">
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-gray-300 leading-relaxed">{content.intro}</p>
      </div>

      {content.sections.map((section: any, index: number) => (
        <section key={index} className="space-y-6">
          {section.type === 'section' ? (
            <Section title={section.title} content={section.content} />
          ) : section.type === 'table' ? (
            <>
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <TableSection headers={section.headers} rows={section.rows} />
            </>
          ) : section.type === 'list' ? (
            <>
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <ListSection items={section.items} />
            </>
          ) : section.type === 'severity' ? (
            <>
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
                <div className="flex items-center gap-4">
                  <SeverityBadge severity={section.level} />
                  <p className="text-gray-300">{section.content}</p>
                </div>
              </div>
            </>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function RelatedTool({ tool }: { tool: { name: string; description: string; link: string } }) {
  return (
    <div className="mt-12 p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <Monitor className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2">Try Our {tool.name}</h3>
          <p className="text-gray-300 mb-4">{tool.description}</p>
          <Link
            href={tool.link}
            className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium
              transition-all duration-200 hover:bg-blue-500 hover:scale-105 group"
          >
            Launch Test Tool
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  //SEO using Next.js Metadata API (preferred method)
  // You'd typically do this in a `route.js` or `route.ts` file *alongside* this component.
  // Example (inside a file in your `/app/blog/[slug]` directory named `route.js` or `.ts`):
  /*
  export async function generateMetadata({ params, searchParams }: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
  }): Promise<Metadata> {
    const slug = params.slug;
    const post = posts[slug as keyof typeof posts];

    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: post.seo?.title || post.title,
      description: post.seo?.description || '',
      keywords: post.seo?.keywords || [],
      openGraph: {
        title: post.seo?.title || post.title,
        description: post.seo?.description || '',
        type: 'article',
        publishedTime: post.date,
        //images: ['/path/to/your/image.jpg'], // Add an image if you have one
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seo?.title || post.title,
        description: post.seo?.description || '',
        //images: ['/path/to/your/image.jpg'], // Add an image if you have one
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      alternates: {
        canonical: `https://urgenthai.com/blog/${slug}`,
      },
    };
  }
  */

  return (
    <>
      <Head>
        <title>{post.seo?.title || post.title}</title>
        <meta name="description" content={post.seo?.description} />
        <meta name="keywords" content={post.seo?.keywords?.join(', ')} />

        {/* Open Graph */}
        <meta property="og:title" content={post.seo?.title || post.title} />
        <meta property="og:description" content={post.seo?.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo?.title || post.title} />
        <meta name="twitter:description" content={post.seo?.description} />

        {/* Additional SEO */}
        <link rel="canonical" href={`https://urgenthai.com/blog/${slug}`} />
      </Head>

      <div className="min-h-screen bg-gray-900">
        <div className="relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.08),transparent_50%)]" />

          <main className="relative max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
            {/* Back to Blog */}
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-2" />
              <span>Back to Blog</span>
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  {post.icon}
                </div>
                <div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-8">
                {post.title}
              </h1>
            </header>

            {/* Article Content */}
            <article>
              <BlogContent content={post.content} />
              {post.tool && <RelatedTool tool={post.tool} />}
            </article>

            {/* Share and Navigation */}
            <footer className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <Link
                  href="/blog"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Back to Blog
                </Link>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}