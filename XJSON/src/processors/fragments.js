const FRAGMENT_REGEX = /#FRAGMENT\(((?!#FRAGMENT\().)*\)#FRAGMENT/gs;
const FRAGMENT_MARKER_LENGTH = 10;
const FRAGMENTS_REGEX = /#FRAGMENTS\(((?!#FRAGMENTS\().)*\)#FRAGMENTS/gs;
const FRAGMENTS_MARKER_LENGTH = 11;
const FRAGMENT_DEFINITION_REGEX = /#FRAGMENT:((?!#FRAGMENT:).)*\(((?!#FRAGMENT:).)*\)#FRAGMENT/gs;
const FRAGMENT_DEFINITION_MARKER_LENGTH = 10;

export default function fragmentsProcessor(string) {
  const [
    stringWithoutFragmentDefinitions,
    fragmentDefinitionsBlocks
  ] = extractFragmentDefinitions(string);
  const fragments = getFragments(fragmentDefinitionsBlocks);
  return resolveFragments(stringWithoutFragmentDefinitions, fragments);
}

function extractFragmentDefinitions(string) {
  const fragmentDefinitionsBlocks = [];
  const stringWithoutFragmentDefinitions = string.replace(
    FRAGMENTS_REGEX,
    fdBlock => {
      fragmentDefinitionsBlocks.push(fdBlock);
      return '';
    }
  );
  return [stringWithoutFragmentDefinitions, fragmentDefinitionsBlocks];
}

function getFragments(fragmentDefinitionsBlocks) {
  const fragments = {};
  fragmentDefinitionsBlocks.forEach(fragmentDefinitionsBlock => {
    const fragmentDefinitions =
      fragmentDefinitionsBlock
        .slice(
          FRAGMENTS_MARKER_LENGTH,
          fragmentDefinitionsBlock.length - FRAGMENTS_MARKER_LENGTH
        )
        .match(FRAGMENT_DEFINITION_REGEX) || [];
    fragmentDefinitions.forEach(fd => addFragment(fd, fragments));
  });
  return fragments;
}

function addFragment(fragmentDefinition, fragments) {
  const startOfContent = fragmentDefinition.indexOf('(');
  const id = fragmentDefinition
    .slice(FRAGMENT_DEFINITION_MARKER_LENGTH, startOfContent)
    .trim();
  const content = fragmentDefinition
    .slice(
      startOfContent + 1,
      fragmentDefinition.length - FRAGMENT_DEFINITION_MARKER_LENGTH
    )
    .trim();

  fragments[id] = {
    resolved: false,
    content
  };
}

function resolveFragments(string, fragments) {
  return string.replace(FRAGMENT_REGEX, fragmentRef =>
    resolveFragment(fragmentRef, fragments)
  );
}

function resolveFragment(fragmentRef, fragments) {
  const fragmentId = getFragmentId(fragmentRef);
  const fragment = fragments[fragmentId];
  if (typeof fragment === 'undefined') {
    throw new Error(
      `Fragment ${fragmentId} is not found in fragment definitions`
    );
  }
  if (!fragment.resolved) {
    fragment.content = resolveFragments(fragment.content, fragments);
    fragment.resolved = true;
  }
  return fragment.content;
}

function getFragmentId(fragmentRef) {
  return fragmentRef
    .slice(FRAGMENT_MARKER_LENGTH, fragmentRef.length - FRAGMENT_MARKER_LENGTH)
    .trim();
}
