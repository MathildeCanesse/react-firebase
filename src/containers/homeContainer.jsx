import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomeComponent from '../components/Home';
import {
  getName,
  isNameValidate,
  updateName,
  validateName,
} from '../reducers/UsersReducer';

const mapStateToProps = createStructuredSelector({
  name: getName,
  nameValidate: isNameValidate,
});

const mapDispatchToProps = {
  updateName,
  validateName,
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(
  HomeComponent
);

export default HomeContainer;
