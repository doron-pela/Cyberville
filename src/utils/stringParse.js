export function stringParse(raw){
    // Step 1: decode unicode escapes
    const decoded = raw.replace(/\\u([\dA-F]{4})/gi, (_, g) =>
      String.fromCharCode(parseInt(g, 16))
    );
    // Step 2: strip HTML tags
    const withoutTags = decoded.replace(/<\/?[^>]+(>|$)/g, "");
    // cut off anything after "Español"
    const englishOnly = withoutTags.split("Español")[0].trim();

    return englishOnly;
}