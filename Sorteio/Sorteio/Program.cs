using System;
using System.Collections.Generic;

class Program
{
    static void Main(string[] args)
    {
        List<List<int>> groups = new List<List<int>>();
        Random random = new Random();

        for (int i = 0; i < 10; i++)
        {
            List<int> group = new List<int>();

            while (group.Count < 15)
            {
                int number = random.Next(1, 26);

                // Verifica se o número já está no grupo
                if (!group.Contains(number))
                {
                    group.Add(number);
                }
            }

            group.Sort(); // Ordena os números do grupo
            groups.Add(group);
        }

        // Apresenta os grupos gerados
        for (int i = 0; i < groups.Count; i++)
        {
            Console.WriteLine($"Grupo {i + 1}: {string.Join(", ", groups[i])}");
        }

        Console.ReadLine();
    }
}
