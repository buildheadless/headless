import {ArrayOfObjectsInputProps, defineField} from 'sanity';

import SectionsListInput from '../../../components/SectionsListInput';

const globalSections = [
  {
    type: 'imageBannerSection',
  },
  {
    type: 'featuredCollectionSection',
  },
  {
    type: 'featuredProductSection',
  },
  {
    type: 'collectionListSection',
  },
  {
    type: 'ctaSection',
  },
];

const pdpSections = [
  {
    type: 'productInformationSection',
  },
  {
    type: 'relatedProductsSection',
  },
  ...globalSections,
];

export default defineField({
  title: 'Sections',
  name: 'sections',
  type: 'array',
  group: 'pagebuilder',
  of: globalSections,
  components: {
    input: (props: ArrayOfObjectsInputProps) =>
      SectionsListInput({type: 'section', ...props}),
  },
});

export const productSections = defineField({
  title: 'Sections',
  name: 'productSections',
  type: 'array',
  group: 'pagebuilder',
  of: pdpSections,
  components: {
    input: (props: ArrayOfObjectsInputProps) =>
      SectionsListInput({type: 'section', ...props}),
  },
});
