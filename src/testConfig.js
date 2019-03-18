import register from 'ignore-styles';
register(['.css', '.sass', '.scss']);
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
