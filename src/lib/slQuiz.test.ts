import { describe, expect, it } from "vitest";
import { quizOutcomes, quizQuestions, scoreQuiz } from "./slQuiz";
import { getJournalEntry } from "./journal";

describe("Sierra Leone quiz scoring", () => {
  it("is deterministic: the same answers always give the same outcome", () => {
    const answers = [0, 1, 2, 3];
    expect(scoreQuiz(answers).id).toBe(scoreQuiz(answers).id);
  });

  it("can reach every outcome", () => {
    const reached = new Set<string>();
    const choices = quizQuestions.map((q) => q.options.length);
    const walk = (q: number, picked: number[]) => {
      if (q === choices.length) {
        reached.add(scoreQuiz(picked).id);
        return;
      }
      for (let i = 0; i < choices[q]; i++) walk(q + 1, [...picked, i]);
    };
    walk(0, []);
    expect([...reached].sort()).toEqual(quizOutcomes.map((o) => o.id).sort());
  });

  it("gives the beach outcome to someone who picks all the beach answers", () => {
    expect(scoreQuiz([0, 0, 0, 1]).id).toBe("beach");
  });

  it("gives the wildlife outcome to rainforest, hiking, long-trip answers", () => {
    expect(scoreQuiz([1, 1, 2, 0]).id).toBe("wildlife");
  });

  it("gives the heritage outcome to history-focused answers", () => {
    expect(scoreQuiz([2, 2, 3, 0]).id).toBe("heritage");
  });

  it("breaks ties in favour of the earlier outcome, and ignores invalid choices", () => {
    expect(scoreQuiz([]).id).toBe(quizOutcomes[0].id);
    expect(scoreQuiz([99, 99]).id).toBe(quizOutcomes[0].id);
  });

  it("only links to journal guides that exist", () => {
    for (const outcome of quizOutcomes) {
      for (const guide of outcome.guides) {
        expect(getJournalEntry(guide.slug), `${outcome.id}: ${guide.slug}`).toBeDefined();
      }
    }
  });
});
