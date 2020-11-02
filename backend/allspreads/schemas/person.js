import { MdPersonAdd as icon } from 'react-icons/md';

export default {
  name: 'person',
  title: 'Handicapper',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Handicapper',
      type: 'string',
      description: 'name of the handicapper',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us a little bit about this handicapper',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
