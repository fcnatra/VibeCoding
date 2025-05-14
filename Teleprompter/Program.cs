using System;

namespace Teleprompter
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to the Teleprompter!");
            Console.WriteLine("Please enter the text you want to display:");

            string inputText = Console.ReadLine();

            Console.WriteLine("You can start the teleprompter by pressing any key...");
            Console.ReadKey();

            Console.WriteLine("\n\nDisplaying text...");

            while (!Console.KeyAvailable)
            {
                Console.SetCursorPosition(0, Console.CursorTop);
                foreach (char c in inputText)
                {
                    if (Console.KeyAvailable) break;
                    Console.Write(c);
                    System.Threading.Thread.Sleep(100);
                }
                System.Threading.Thread.Sleep(500); // Pause before restarting
                Console.SetCursorPosition(0, Console.CursorTop);
                Console.Write(new string(' ', inputText.Length));
                Console.SetCursorPosition(0, Console.CursorTop);
            }

            Console.WriteLine("\n\nTeleprompter finished. Press any key to exit.");
            Console.ReadKey();
        }
    }
}