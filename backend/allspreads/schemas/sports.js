import { FcSportsMode as icon} from 'react-icons/Fc';

export default {
  name: 'sports',
  title: 'Sports',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Sport',
      type: 'string',
      description: 'description of sport'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    }
  ]
}