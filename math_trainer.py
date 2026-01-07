import random
import time
from collections import deque, defaultdict
import math

class MathTrainer:
    def __init__(self):
        self.current_level = 1
        self.correct_streak = 0
        self.total_problems = 0
        self.correct_answers = 0
        self.problem_history = deque(maxlen=10)  # Keep track of last 10 problems
        self.levels = {
            1: "Simple Addition/Subtraction",
            2: "Multi-digit Arithmetic",
            3: "Multiplication",
            4: "Division"
        }
        # Statistics tracking
        self.level_stats = defaultdict(lambda: {"attempts": 0, "correct": 0, "total_time": 0})
        self.problems_per_level = {}
        self.total_problem_limit = 0

    def is_similar_problem(self, num1, num2, operation):
        # Check if the problem is too similar to recent problems
        problem_key = (num1, num2, operation)
        return problem_key in self.problem_history

    def generate_balanced_numbers(self, min_val, max_val, avoid_edges=True):
        if avoid_edges:
            # Reduce frequency of edge cases (0, 1, max_value)
            if random.random() < 0.8:  # 80% of the time avoid edge cases
                min_val = max(min_val + 1, 2)
                max_val = max_val - 1
        return random.randint(min_val, max_val)

    def generate_problem(self):
        max_attempts = 10  # Maximum attempts to generate a unique problem

        for _ in range(max_attempts):
            if self.current_level == 1:
                num1 = self.generate_balanced_numbers(0, 9)
                num2 = self.generate_balanced_numbers(0, 9)
                operation = random.choice(['+', '-'])
                if operation == '-' and num2 > num1:
                    num1, num2 = num2, num1

            elif self.current_level == 2:
                # Multi-digit arithmetic with more balanced distribution
                num1 = random.randint(10, 999)
                num2 = random.randint(10, 999)
                operation = random.choice(['+', '-'])
                if operation == '-' and num2 > num1:
                    num1, num2 = num2, num1

            elif self.current_level == 3:
                # Multiplication with better distribution
                num1 = self.generate_balanced_numbers(0, 12, avoid_edges=True)
                num2 = self.generate_balanced_numbers(0, 12, avoid_edges=True)
                operation = '×'

            else:  # Level 4
                # Division with better distribution
                denominator = self.generate_balanced_numbers(1, 12, avoid_edges=True)
                answer = self.generate_balanced_numbers(1, 12, avoid_edges=True)
                numerator = denominator * answer
                problem = f"{numerator} ÷ {denominator}"
                
                if not self.is_similar_problem(numerator, denominator, '÷'):
                    self.problem_history.append((numerator, denominator, '÷'))
                    return problem, answer

                continue

            if not self.is_similar_problem(num1, num2, operation):
                problem = f"{num1} {operation} {num2}"
                answer = eval(problem.replace('×', '*').replace('÷', '/'))
                self.problem_history.append((num1, num2, operation))
                return problem, answer

        # If we couldn't generate a unique problem after max_attempts,
        # generate one anyway but clear part of the history
        self.problem_history.clear()
        if self.current_level == 4:
            denominator = self.generate_balanced_numbers(1, 12)
            answer = self.generate_balanced_numbers(1, 12)
            numerator = denominator * answer
            problem = f"{numerator} ÷ {denominator}"
        else:
            num1 = self.generate_balanced_numbers(0, 12)
            num2 = self.generate_balanced_numbers(0, 12)
            operation = '×' if self.current_level == 3 else random.choice(['+', '-'])
            problem = f"{num1} {operation} {num2}"
            answer = eval(problem.replace('×', '*'))
        
        return problem, answer

    def check_level_progression(self):
        # When using problem distribution, only check the number of problems completed
        if self.problems_per_level:
            current_attempts = self.level_stats[self.current_level]["attempts"]
            allocated_problems = self.problems_per_level[self.current_level]
            
            if current_attempts >= allocated_problems:
                # Move to the next level that has remaining problems
                for level in range(self.current_level + 1, len(self.levels) + 1):
                    if self.level_stats[level]["attempts"] < self.problems_per_level[level]:
                        self.current_level = level
                        self.correct_streak = 0
                        print(f"\nMoving on to {self.levels[self.current_level]}!")
                        return
        # Streak-based progression only used when not using problem distribution
        elif self.current_level < 4:
            if self.current_level == 1 and self.correct_streak >= 5:
                self.current_level = 2
                self.correct_streak = 0
                print("\nGreat job! Moving on to multi-digit arithmetic!")
            elif self.current_level == 2 and self.correct_streak >= 5:
                self.current_level = 3
                self.correct_streak = 0
                print("\nExcellent! Let's try multiplication!")
            elif self.current_level == 3 and self.correct_streak >= 15:
                self.current_level = 4
                self.correct_streak = 0
                print("\nAmazing! Time for division problems!")

    def distribute_problems(self, total):
        """Distribute total problems evenly across all levels"""
        num_levels = len(self.levels)
        base_problems = total // num_levels
        remainder = total % num_levels
        
        # Distribute base problems to all levels
        for level in self.levels:
            self.problems_per_level[level] = base_problems
        
        # Distribute remaining problems one by one
        for level in range(1, remainder + 1):
            self.problems_per_level[level] += 1
        
        print("\nProblems will be distributed as follows:")
        for level, name in self.levels.items():
            print(f"{name}: {self.problems_per_level[level]} problems")

    def get_user_preferences(self):
        print("\nWelcome to Math Trainer!")
        print("How would you like to set up your training session?")
        
        while True:
            choice = input("\nWould you like to set:\n1. Total number of problems\n2. Number of problems per level\nEnter 1 or 2: ").strip()
            
            if choice == "1":
                while True:
                    try:
                        total = int(input("\nEnter total number of problems you want to solve: "))
                        if total > 0:
                            self.total_problem_limit = total
                            self.distribute_problems(total)
                            return
                        print("Please enter a positive number.")
                    except ValueError:
                        print("Please enter a valid number.")
            
            elif choice == "2":
                for level, name in self.levels.items():
                    while True:
                        try:
                            num = int(input(f"\nHow many {name} problems would you like? "))
                            if num >= 0:
                                self.problems_per_level[level] = num
                                break
                            print("Please enter a non-negative number.")
                        except ValueError:
                            print("Please enter a valid number.")
                return
            
            else:
                print("Please enter either 1 or 2.")

    def can_continue(self):
        if self.problems_per_level:
            # Check if there are any levels with remaining problems
            return any(self.level_stats[level]["attempts"] < count 
                      for level, count in self.problems_per_level.items())
        else:
            return self.total_problems < self.total_problem_limit

    def update_statistics(self, level, is_correct, time_taken):
        stats = self.level_stats[level]
        stats["attempts"] += 1
        if is_correct:
            stats["correct"] += 1
        stats["total_time"] += time_taken

    def print_summary(self):
        print("\n=== Final Results ===")
        print(f"Total Problems Attempted: {self.total_problems}")
        print(f"Total Correct Answers: {self.correct_answers}")
        if self.total_problems > 0:
            print(f"Overall Accuracy: {(self.correct_answers/self.total_problems)*100:.1f}%")
        
        print("\n=== Performance by Level ===")
        for level, name in self.levels.items():
            stats = self.level_stats[level]
            if stats["attempts"] > 0:
                accuracy = (stats["correct"] / stats["attempts"]) * 100
                avg_time = stats["total_time"] / stats["attempts"]
                print(f"\n{name}:")
                print(f"  Problems Attempted: {stats['attempts']}")
                print(f"  Correct Answers: {stats['correct']}")
                print(f"  Accuracy: {accuracy:.1f}%")
                print(f"  Average Time: {avg_time:.2f} seconds")

    def run(self):
        self.get_user_preferences()
        print("\nAnswer the problems correctly to progress to harder levels.")
        print("Type 'quit' or 'q' to exit the program.\n")

        while self.can_continue():
            # Check level progression at the start of each loop
            if self.problems_per_level:
                self.check_level_progression()
                
            print(f"\nCurrent Level: {self.levels[self.current_level]}")
            print(f"Correct Streak: {self.correct_streak}")
            problems_in_level = self.problems_per_level.get(self.current_level, self.total_problem_limit)
            print(f"Problems in this level: {self.level_stats[self.current_level]['attempts']}/{problems_in_level}")
            
            # Skip this level if we've already completed all its problems
            if (self.problems_per_level and 
                self.level_stats[self.current_level]["attempts"] >= self.problems_per_level[self.current_level]):
                continue
            
            problem, correct_answer = self.generate_problem()
            print(f"\nSolve: {problem} = ?")
            
            start_time = time.time()
            user_answer = input("Your answer: ").strip().lower()
            
            if user_answer in ['quit', 'q']:
                break
            
            try:
                user_answer = int(user_answer)
                elapsed_time = time.time() - start_time
                
                is_correct = user_answer == correct_answer
                if is_correct:
                    print("Correct! ✓")
                    self.correct_streak += 1
                    self.correct_answers += 1
                    print(f"Time taken: {elapsed_time:.2f} seconds")
                else:
                    print(f"Incorrect. The correct answer was {correct_answer}")
                    self.correct_streak = 0
                
                self.total_problems += 1
                self.update_statistics(self.current_level, is_correct, elapsed_time)
                
            except ValueError:
                print("Please enter a valid number, 'quit', or 'q' to exit.")

        self.print_summary()
        print("\nThanks for practicing! Keep up the good work!")

if __name__ == "__main__":
    trainer = MathTrainer()
    trainer.run() 