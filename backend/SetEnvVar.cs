namespace Lanekassen;

internal class SetEnvVar {
  public static void SetVariables(string filePath) {
    if (string.IsNullOrEmpty(filePath)) {
      throw new ArgumentNullException(nameof(filePath));
    }

    if (!File.Exists(filePath)) {
      throw new FileNotFoundException($"File not found: {filePath}");
    }

    Dictionary<string, string> envVars = new();

    // Read all lines from the file
    string[] lines = File.ReadAllLines(filePath);

    // Loop through each line
    foreach (string line in lines) {
      // Skip comments and empty lines
      if (string.IsNullOrEmpty(line) || line.StartsWith("#")) {
        continue;
      }

      // Split the line into name and value parts
      string[] parts = line.Split('=', StringSplitOptions.RemoveEmptyEntries);
      if (parts.Length == 2) {
        string name = parts[0].Trim();
        string value = parts[1].Trim();

        // Add or update the environment variable
        if (!envVars.ContainsKey(name)) {
          envVars.Add(name, value);
        } else {
          envVars[name] = value;
        }
      }
    }

    // Set the environment variables
    foreach (KeyValuePair<string, string> kvp in envVars) {
      Environment.SetEnvironmentVariable(kvp.Key, kvp.Value, EnvironmentVariableTarget.Process);
    }
  }
}