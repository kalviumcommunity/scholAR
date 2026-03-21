# ScholAR: Advanced Research Assistant with Retrieval

![ScholAR Logo](https://img.shields.io/badge/ScholAR-Research%20Assistant-blue?style=for-the-badge&logo=ai)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-yellow)

## 🧠 Overview

ScholAR is an AI-powered research assistant built as a Kalvium capstone project. It combines RAG, multi-persona prompting, and chain-of-thought reasoning to help researchers and students manage complex research workflows.

## ✨ Key Features

### 🎭 Multi-Persona AI System
- **Literature Reviewer**: Comprehensive paper analysis and synthesis
- **Data Analyst**: Statistical interpretation and visualization
- **Citation Manager**: Automated formatting and validation
- **Writing Assistant**: Academic writing support and editing

### 🎛️ Dynamic Parameter Tuning
- Automatic temperature adjustment based on task type
- Context-aware response length optimization
- Domain-specific parameter profiles

### 📊 Structured Output Generation
- Standardized research summaries (Abstract, Findings, Methodology)
- Multi-format citations (APA, MLA, Chicago, IEEE)
- JSON metadata for reference managers

### 🧩 Retrieval-Augmented Generation (RAG)
- Personal knowledge base creation and management
- Cross-document intelligent querying
- Automatic knowledge linking and synthesis

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- An LLM API key (OpenAI or compatible)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Uday9909/scholAR.git
cd scholAR
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Add your API keys to .env
```

4. **Start the app**
```bash
npm run dev
```

## 📖 Usage Examples

### Basic Research Query
```typescript
const response = await assistant.query({
  question: "What are recent developments in quantum computing?",
  persona: "literature_reviewer",
  output_format: "structured_summary"
});
```

### RAG Query
```typescript
const insights = await assistant.ragQuery({
  question: "How do quantum algorithms compare to classical ones?",
  sources: ["personal_library"]
});
```

## 🏗️ Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway    │    │   AI Engine     │
│   (React)       │◄──►│   (Express)      │◄──►│   (LangChain)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                        │
                       ┌──────────────────┐    ┌─────────────────┐
                       │   Vector DB      │    │   Function      │
                       │   (Pinecone)     │    │   Registry      │
                       └──────────────────┘    └─────────────────┘
```

## 🔧 Configuration

### System Prompts
Located in `config/prompts/`, customize AI personas:
```yaml
literature_reviewer:
  system_prompt: "You are an expert academic literature reviewer..."
  temperature: 0.3
  max_tokens: 2000
```

### RAG Settings
```yaml
embedding_model: "text-embedding-ada-002"
chunk_size: 1000
overlap: 200
similarity_threshold: 0.75
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- LangChain for the AI application framework
- OpenAI for GPT models and embeddings

---

**Built by [Udaybir Singh](https://github.com/Uday9909)**
