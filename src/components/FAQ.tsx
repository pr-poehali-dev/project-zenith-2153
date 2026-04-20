import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит кухня на заказ?",
    answer:
      "Стоимость зависит от размера, материалов и фурнитуры. Мы работаем в разных ценовых сегментах и всегда предлагаем оптимальное решение под ваш бюджет. Расчёт стоимости — бесплатно, после первого замера.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer:
      "Стандартный срок — от 4 до 8 недель с момента подтверждения проекта. Сначала делаем замер, затем согласовываем дизайн, после этого запускаем производство. Точные сроки фиксируем в договоре.",
  },
  {
    question: "Вы делаете замер бесплатно?",
    answer:
      "Да, выезд замерщика и первичная консультация — бесплатно. Специалист приедет в удобное время, снимет точные размеры и поможет определиться с планировкой.",
  },
  {
    question: "Какие материалы вы используете?",
    answer:
      "Работаем с проверенными поставщиками: фасады из МДФ, массива и акрила, столешницы из камня, постформинга и дерева. Фурнитура — Blum, Hettich, Grass. Помогаем подобрать лучший вариант под ваши задачи и бюджет.",
  },
  {
    question: "Даёте ли вы гарантию?",
    answer:
      "Да, мы даём гарантию 5 лет на фасады и корпуса, и 2 года на фурнитуру. Если что-то пойдёт не так — приедем и бесплатно устраним.",
  },
  {
    question: "Как начать сотрудничество?",
    answer:
      "Оставьте заявку или позвоните нам. Мы согласуем удобное время для замера — это бесплатно и ни к чему не обязывает. После замера вы получите готовый проект с ценой.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}