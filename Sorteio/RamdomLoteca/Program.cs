using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            const int numGroups = 30;
            const int groupSize = 15;
            const int maxValue = 25;

            // Inicializa uma lista de sequências possíveis de tamanho `groupSize`
            var sequences = Enumerable.Range(1, maxValue - groupSize + 1)
                .Select(start => Enumerable.Range(start, groupSize));

            // Inicializa uma lista vazia de grupos
            var groups = new List<int[]>();

            // Gera `numGroups` grupos aleatórios
            var random = new Random();
            for (int i = 0; i < numGroups; i++)
            {
                // Seleciona uma sequência aleatória que ainda não foi usada
                var sequence = sequences.Except(groups)
                    .OrderBy(x => random.Next())
                    .FirstOrDefault();

                // Se não há mais sequências possíveis, termina o loop
                if (sequence == null)
                    break;

                // Adiciona a sequência ao grupo e remove todas as sequências equivalentes
                groups.Add(sequence.ToArray());
                groups.RemoveAll(s => s.SequenceEqual(sequence));
            }

            // Imprime os grupos gerados
            for (int i = 0; i < groups.Count; i++)
            {
                Console.WriteLine($"Grupo {i + 1}:");
                Console.WriteLine(string.Join(", ", groups[i]));
                Console.WriteLine();
            }
        }
    }
}
