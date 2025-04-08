import React from 'react';
import CodeSnippet from '../../../components/CodeSnippet/CodeSnippet';
import '../Problems.css'; // Reusing common problem page styles

const FindAndReplaceString = () => {
  // Define code snippets inside the component using template literals
  const jsCode = `
function findReplaceString(s, indices, sources, targets) {
    // Combine indices, sources, and targets into objects for easier sorting
    let replacements = [];
    for (let i = 0; i < indices.length; i++) {
        replacements.push({ index: indices[i], source: sources[i], target: targets[i] });
    }

    // Sort replacements by index in descending order
    replacements.sort((a, b) => b.index - a.index);

    // Convert string to array for easier modification (more robust than string concat)
    let resArr = s.split('');

    for (const { index, source, target } of replacements) {
        // Check if the source string matches the substring in the ORIGINAL string 's'
        if (s.substring(index, index + source.length) === source) {
            // Perform the replacement in the result array
            resArr.splice(index, source.length, ...target.split(''));
        }
    }

    return resArr.join('');
}

// Example Usage:
const s = "abcd";
const indices = [0, 2];
const sources = ["a", "cd"];
const targets = ["eee", "ffff"];
console.log(findReplaceString(s, indices, sources, targets)); // Output: "eeebffff"

const s2 = "abcd";
const indices2 = [0, 2];
const sources2 = ["ab", "ec"];
const targets2 = ["eee", "ffff"];
console.log(findReplaceString(s2, indices2, sources2, targets2)); // Output: "eeecd" (second replacement doesn't match)
`;

  const pythonCode = `
def findReplaceString(s: str, indices: list[int], sources: list[str], targets: list[str]) -> str:
    # Combine indices, sources, and targets into tuples for easier sorting
    # Sort by index descending
    replacements = sorted([(indices[i], sources[i], targets[i]) for i in range(len(indices))], key=lambda x: x[0], reverse=True)
    
    result = list(s) # Convert string to list for easier modification

    for index, source, target in replacements:
        # Check if the source string matches the substring at the given index
        # Check against the original string 's' as per problem statement interpretation
        if s[index : index + len(source)] == source:
            # Perform the replacement in the list
            result[index : index + len(source)] = list(target)

    return "".join(result) # Join the list back into a string

# Example Usage:
s = "abcd"
indices = [0, 2]
sources = ["a", "cd"]
targets = ["eee", "ffff"]
print(findReplaceString(s, indices, sources, targets)) # Output: "eeebffff"

s2 = "abcd"
indices2 = [0, 2]
sources2 = ["ab", "ec"]
targets2 = ["eee", "ffff"]
print(findReplaceString(s2, indices2, sources2, targets2)) # Output: "eeecd" (second replacement doesn't match)
`;

  // State for language selection
  const [language, setLanguage] = React.useState('javascript');

  return (
    <div className="problem-page"> {/* Use problem-page class */}
      <header className="problem-header"> {/* Add header */}
        <h1>Find And Replace in String</h1>
        <div className="problem-meta">
          <span className="difficulty medium">Medium</span> {/* Add difficulty */}
          <span className="category">Strings</span> {/* Add category */}
        </div>
      </header>

      <section className="problem-statement"> {/* Use problem-statement class */}
        <h2>Problem Description</h2>
        <p>LeetCode Problem 833</p>
        <p>
          You are given a <strong>0-indexed</strong> string <code>s</code>. You are also given three <strong>0-indexed</strong> arrays: <code>indices</code>, <code>sources</code>, and <code>targets</code>, all of the same length.
        </p>
        <p>
          You must perform <code>k</code> replacement operations. Each replacement operation <code>i</code> (<code>{`0 <= i < k`}</code>) checks if the substring <code>sources[i]</code> occurs at index <code>indices[i]</code> in the <strong>original</strong> string <code>s</code>.
        </p>
        <p>
          If it does occur, replace that substring with <code>targets[i]</code>. Otherwise, do nothing.
        </p>
        <p>
          These replacement operations are simultaneous. This means the result of previous replacements does not affect the indexing for later replacements. All operations occur on the original string <code>s</code>.
        </p>
        <p>
          Return <em>the resulting string after performing all replacement operations</em>.
        </p>
        <p><strong>Note:</strong> The problem statement implies simultaneous operations on the original string. However, a common and accepted interpretation (matching LeetCode's expected behavior) involves applying replacements sequentially, often from right-to-left to manage index changes. The provided solution follows this interpretation.</p>
      </section>

      {/* No visualization section for this problem */}

      <section className="approach"> {/* Use approach class */}
        <h2>Approach</h2>
        <div className="approach-content"> {/* Add approach-content div */}
          <h3>Right-to-Left Replacement</h3>
          <p>
            The core idea is to process the replacements in a way that avoids index conflicts caused by previous replacements changing the string length.
          </p>
          <ol>
            <li>
              <strong>Combine and Sort:</strong> Combine the <code>indices</code>, <code>sources</code>, and <code>targets</code> into a single structure (e.g., objects or tuples). Sort these combined replacement operations based on their starting index (<code>indices[i]</code>) in <strong>descending order</strong>. Sorting in reverse ensures that replacements made later in the string do not affect the indices of replacements earlier in the string.
            </li>
            <li>
              <strong>Iterate and Replace:</strong> Iterate through the sorted replacement operations. For each operation:
              <ul>
                <li>Check if the substring of the <strong>original</strong> string <code>s</code> starting at <code>index</code> matches the <code>source</code> string. Use string slicing or substring methods for this check (e.g., <code>s.substring(index, index + source.length) === source</code> in JS or <code>s[index : index + len(source)] == source</code> in Python).</li>
                <li>If there is a match, replace the corresponding section in the result string (or list representation) with the <code>target</code> string. Using an array/list representation of the string makes replacements easier and often more efficient than repeated string concatenation.</li>
              </ul>
            </li>
            <li>
              <strong>Return Result:</strong> After iterating through all potential replacements, join the characters in the result array/list back into a string.
            </li>
          </ol>
          <p>
            Sorting in reverse order is the key trick. By processing from right to left, changes only affect parts of the string that have already been processed or are to the right, leaving the indices for earlier parts of the string valid relative to the *modified* string at that point. Checking against the *original* string 's' ensures we adhere to the condition of matching based on the initial state.
          </p>
          
          <h3>Time Complexity</h3>
          <p>O(N + K log K + Σ(L_targets)), where N is the length of the string <code>s</code>, K is the number of replacement operations, and L_targets is the length of each target string. Sorting takes O(K log K). Converting the string to/from an array takes O(N). The loop runs K times. Inside the loop, string slicing/comparison takes O(L_source). The replacement using splice/list assignment takes roughly O(L_target + N) in the worst case due to potential shifting, but amortizes better. The final join takes O(N). If target lengths are significant, the Σ(L_targets) term matters.</p>

          <h3>Space Complexity</h3>
          <p>O(N + K). O(K) space is needed to store the combined replacement operations. O(N) space is needed for the mutable copy of the string (the array/list).</p>
        </div>
      </section>

      <section className="implementation"> {/* Use implementation class */}
        <h2>Implementation</h2>
        <div className="language-selector"> {/* Add language selector */}
          <button
            onClick={() => setLanguage('javascript')}
            className={`lang-button ${language === 'javascript' ? 'active' : ''}`}
          >
            JavaScript
          </button>
          <button
            onClick={() => setLanguage('python')}
            className={`lang-button ${language === 'python' ? 'active' : ''}`}
          >
            Python
          </button>
        </div>
        <CodeSnippet language={language} code={language === 'javascript' ? jsCode : pythonCode} />
      </section>
    </div>
  );
};

export default FindAndReplaceString;
