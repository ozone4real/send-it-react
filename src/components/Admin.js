import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListGroup from './ListGroup';
import Modal from 'react-modal';
import { fetchAllParcels } from '../actions/parcelsActions';
import AdminEditForm from './AdminEditForm';
import { Wave } from 'better-react-spinkit';
import Utils from '../utils/';
import Pagination from './Pagination';
import SuccessMessage from './common/SuccessMessage';

const { getPagedData } = Utils;

class Admin extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
    selectedCategory: {},
    categories: [
      { id: 0, value: 'all parcels', label: 'All parcels' },
      { id: 1, value: 'pending', label: 'Pending' },
      { id: 2, value: 'in transit', label: 'In transit' },
      { id: 3, value: 'cancelled', label: 'Cancelled' },
      { id: 4, value: 'delivered', label: 'Delivered' },
    ],
    columns: [
      { label: 'Parcel ID', value: 'parcelid' },
      { label: 'Pickup Address', value: 'pickupaddress' },
      { label: 'Destination', value: 'destination' },
      { label: 'Present Location', value: 'presentlocation' },
      { label: 'Pickup Time', value: 'pickuptime' },
      { label: 'Parcel Description', value: 'parceldescription' },
      { label: 'Parcel Weight', value: 'parcelweight' },
      { label: 'Status', value: 'status' },
      { label: 'Price', value: 'price' },
      { label: 'Time Delivered', value: 'receivedat' },
      { label: 'Receiver', value: 'receivedby' },
      { value: 'edit' },
    ],
    selectedCategory: {},
  };

  componentDidMount() {
    this.setState({ selectedCategory: this.state.categories[0] });
    this.props.fetchAllParcels(localStorage.getItem('token'));
  }

  displaySuccessMessage = () => {
    this.setState({
      modalContent: <SuccessMessage message="Parcel successfully updated" />,
    });
  };

  removeModal = () => {
    this.setState({ modalContent: undefined });
  };

  handlePageClick = page => {
    this.setState({ currentPage: page });
  };

  handleCategorySelect = item => {
    this.setState({ selectedCategory: item, currentPage: 1 });
  };

  handleUpdateParcel = parcel => {
    this.setState({
      modalContent: (
        <AdminEditForm
          onModalClose={this.removeModal}
          parcel={parcel}
          displaySuccessMessage={this.displaySuccessMessage}
          admin={this.props.admin}
        />
      ),
      selectedParcel: parcel,
    });
  };

  render() {
    const { categories, selectedCategory, columns, pageSize, currentPage } = this.state;
    if (!this.props.admin.allParcels)
      return (
        <div className="container">
          <div className="div-spinner">
            <Wave size={100} color={'#0b0b61'} />
          </div>
        </div>
      );
    const { allParcels } = this.props.admin;
    const { data: parcelData, totalCount: itemsCount } = getPagedData(allParcels, this);

    return (
      <section className="admin">
        <h2 style={{ textAlign: 'center', marginTop: '10px', color: '#0b0b61' }}>Manage parcels</h2>
        <div className="parcels-section">
          <div className="parcels-section-item">
            <h3 style={{ margin: '5px' }}>Filter parcels by status:</h3>{' '}
            <ListGroup
              listItems={categories}
              onItemSelect={this.handleCategorySelect}
              selectedItem={selectedCategory}
            />
          </div>

          <div className="parcels-section-item table-container">
            <div className="parcels-table">
              <div className="table-header">
                <div className="table-header-row">
                  {columns.map(column => (
                    <div key={column.label} className="table-header-item">
                      {column.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="table-body" />
              {parcelData.map(parcel => (
                <div className="table-body-row">
                  {columns.map(column => (
                    <div className="table-body-column">
                      {column.value === 'edit' &&
                      (parcel.status === 'pending' || parcel.status === 'in transit') ? (
                        <button onClick={() => this.handleUpdateParcel(parcel)}>edit</button>
                      ) : !parcel[column.value] ? (
                        '-'
                      ) : (
                        parcel[column.value]
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Pagination
            pageSize={pageSize}
            currentPage={currentPage}
            itemsCount={itemsCount}
            onPageClick={this.handlePageClick}
          />
        </div>
        <Modal
          isOpen={!!this.state.modalContent}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          {this.state.modalContent}
        </Modal>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllParcels: token => dispatch(fetchAllParcels(token)),
});

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin);
