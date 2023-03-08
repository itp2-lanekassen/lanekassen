namespace Lanekassen;
public static class DotEnv {
  public static void Load(string filePath) {
    if (!File.Exists(filePath)) {
      Console.WriteLine($"File {filePath} does not exist");
      return;
    }

    foreach (string line in File.ReadAllLines(filePath)) {
      string[] parts = line.Split(
          '=',
          StringSplitOptions.RemoveEmptyEntries);

      if (parts.Length != 2) {
        Console.WriteLine($"Line {line} is not a valid environment variable");
        continue;
      }
      string key = parts[0];
      string value = parts[1];
      Environment.SetEnvironmentVariable(key, value);
    }
  }
}

// Fetched from https://dusted.codes/dotenv-in-dotnet?fbclid=IwAR0R9x9nvUe-JZKr6lRyT4et3rCAxPARVgFQgQeQhE1dR6ltfheseYkuEFA 