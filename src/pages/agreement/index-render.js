import layout from '@layout';
import content from './index.ejs';
const title = 'Agreement';
const keyword = '';
const description = '';

export default layout.render({
    title,
    keyword,
    description,
    content,
    loading: false,
    location: [{ name: 'agreement', url: 'agreement.html' }, { name: 'demo' }]
});
