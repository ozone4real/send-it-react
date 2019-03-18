import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Circle, Wave } from 'better-react-spinkit';
import ListGroup from './ListGroup';
import ParcelTiles from './ParcelTiles';
import ChangeDestinationForm from './ChangeDestinationForm';
import {
  changeParcelDestination,
  fetchAllUserParcels,
  cancelParcelDelivery,
} from '../actions/parcelsActions';
import Pagination from './Pagination';
import SuccessMessage from './common/SuccessMessage';
import Utils from '../utils';

const { getPagedData } = Utils;

const token = localStorage.getItem('token');

class ParcelDeliveryHistory extends Component {
  state = {
    currentPage: 1,
    pageSize: 6,
    selectedCategory: {},
    categories: [
      { id: 0, value: 'all parcels', label: 'All parcels' },
      { id: 1, value: 'pending', label: 'Pending' },
      { id: 2, value: 'in transit', label: 'In transit' },
      { id: 3, value: 'cancelled', label: 'Cancelled' },
      { id: 4, value: 'delivered', label: 'Delivered' },
    ],
  };

  componentDidUpdate(prevprops) {
    if (prevprops.singleParcel !== this.props.singleParcel) {
      const { singleParcel } = this.props;
      if (singleParcel.data) {
        const {
          data: { destination, price },
        } = singleParcel;
        const modalContent = (
          <div className="form update-form">
            <ul>
              <li>
                <h4>Confirm Update</h4>
              </li>
              <li>
                <h3>New Destination: </h3> {destination}
              </li>
              <li>
                <h3>New Price: </h3> N{price}
              </li>
              <li>
                <button
                  onClick={() =>
                    this.handleSubmitUpdatedDestination({
                      destination,
                    })
                  }
                >
                  Confirm
                </button>{' '}
                <button onClick={this.removeModal}>Cancel</button>
              </li>
            </ul>
          </div>
        );

        this.setState({ modalContent });
      }
    }
  }

  componentDidMount() {
    this.setState({ selectedCategory: this.state.categories[0] });
  }

  handleCategorySelect = item => {
    this.setState({ selectedCategory: item, currentPage: 1 });
  };

  removeModal = () => {
    this.setState({ modalContent: undefined });
  };

  handleChangeDestination = parcel => {
    const selectedParcel = parcel;
    const modalContent = <ChangeDestinationForm parcel={parcel} onModalClose={this.removeModal} />;
    this.setState({ selectedParcel, modalContent });
  };

  handleCancelDelivery = async () => {
    this.setState({
      modalContent: (
        <div className="div-spinner">
          <Circle size={100} color={'white'} />
        </div>
      ),
    });
    const {
      selectedParcel: { parcelid },
    } = this.state;
    const { cancelParcelDelivery } = this.props;
    await cancelParcelDelivery(parcelid, token);
    this.setState({
      modalContent: <SuccessMessage message="Parcel Delivery Successfully Cancelled" />,
    });
    setTimeout(this.removeModal, 1000);
  };

  handleCancelButtonClick = parcel => {
    const selectedParcel = parcel;
    const modalContent = (
      <div className="form update-form">
        <ul>
          <li>
            <h4>
              Are you sure you want to cancel this parcel delivery (Parcel ID: {parcel.parcelid})?
            </h4>
          </li>
          <li>
            <button onClick={this.handleCancelDelivery}>Yes, Cancel !</button>{' '}
            <button onClick={this.removeModal}>No, Return !</button>
          </li>
        </ul>
      </div>
    );
    this.setState({ selectedParcel, modalContent });
  };

  handlePageClick = page => {
    this.setState({ currentPage: page });
  };

  handleSubmitUpdatedDestination = async destination => {
    this.setState({
      modalContent: (
        <div className="div-spinner">
          <Circle size={100} color={'white'} />
        </div>
      ),
    });
    const { submitData } = this.props;
    const token = localStorage.getItem('token');
    const { selectedParcel } = this.state;
    await submitData(token, selectedParcel.parcelid, destination);
    this.setState({
      modalContent: <SuccessMessage message="Parcel Destination Successfully Updated" />,
    });
    setTimeout(this.removeModal, 1000);
  };

  render() {
    const { categories, selectedCategory, pageSize, currentPage } = this.state;
    const { userParcels } = this.props;
    if (!userParcels[0] && !userParcels.errorMessage) {
      return (
        <div className="div-spinner">
          <Wave size={100} color={'#0b0b61'} />
        </div>
      );
    }
    if (userParcels.errorMessage)
      return (
        <div style={{ textAlign: 'center' }}>
          <h2>You have no parcel delivery orders</h2>
        </div>
      );
    const { data: parcelData, totalCount: itemsCount } = getPagedData(userParcels, this);
    return (
      <div className="parcel-delivery-history">
        <div className="filter-sec">
          <h3>Filter parcels by status:</h3>
          <ListGroup
            listItems={categories}
            onItemSelect={this.handleCategorySelect}
            selectedItem={selectedCategory}
          />
        </div>
        <div className="user-parcels-section">
          <ParcelTiles
            data={parcelData}
            onChangeDestination={this.handleChangeDestination}
            onCancelButtonClick={this.handleCancelButtonClick}
          />
        </div>
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemsCount={itemsCount}
          onPageClick={this.handlePageClick}
        />
        <Modal
          isOpen={!!this.state.modalContent}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          {this.state.modalContent}
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitData: (token, id, data) => dispatch(changeParcelDestination(token, id, data)),
  fetchAllUserParcels: token => dispatch(fetchAllUserParcels(token)),
  cancelParcelDelivery: (id, token) => dispatch(cancelParcelDelivery(id, token)),
});

const mapStateToProps = state => ({
  singleParcel: state.singleParcel,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParcelDeliveryHistory);
