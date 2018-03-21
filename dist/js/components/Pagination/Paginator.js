'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PaginationRow = require('./PaginationRow');

var _PaginationRow2 = _interopRequireDefault(_PaginationRow);

var _helpers = require('../../common/helpers');

var _PaginationConstants = require('./PaginationConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paginator = function (_React$Component) {
  _inherits(Paginator, _React$Component);

  function Paginator(props) {
    _classCallCheck(this, Paginator);

    var _this = _possibleConstructorReturn(this, (Paginator.__proto__ || Object.getPrototypeOf(Paginator)).call(this, props));

    (0, _helpers.bindMethods)(_this, ['handleFormSubmit']);

    _this.initPagination(props);

    _this.state = {
      pageChangeValue: props.pagination.page
    };
    return _this;
  }

  _createClass(Paginator, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var pagination = nextProps.pagination;

      if (this.state.pageChangeValue !== pagination.page) {
        this.setState({
          pageChangeValue: Number(pagination.page)
        });
      }

      this.initPagination(nextProps);
    }
  }, {
    key: 'setPage',
    value: function setPage(value) {
      var page = Number(value);
      if (!Number.isNaN(value) && value !== '' && page > 0 && page <= this.totalPages()) {
        this.props.onPageSet(page);
      }
    }
  }, {
    key: 'setPageRelative',
    value: function setPageRelative(diff) {
      var pagination = this.props.pagination;

      var page = Number(pagination.page) + diff;
      this.setPage(page);
    }
  }, {
    key: 'handleFormSubmit',
    value: function handleFormSubmit(e) {
      this.setPage(this.state.pageChangeValue);
    }
  }, {
    key: 'handlePageChange',
    value: function handlePageChange(e) {
      this.setState({ pageChangeValue: e.target.value });
    }
  }, {
    key: 'initPagination',
    value: function initPagination(props) {
      var pagination = props.pagination;

      this.perPage = Number(pagination.perPage);
      this.currentPage = Number(pagination.page);
      this.itemCount = Number(props.itemCount);
    }
  }, {
    key: 'totalPages',
    value: function totalPages() {
      return Math.ceil(this.props.itemCount / this.perPage);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var pageChangeValue = this.state.pageChangeValue;
      var _props = this.props,
          className = _props.className,
          viewType = _props.viewType,
          itemCount = _props.itemCount,
          messages = _props.messages,
          dropdownButtonId = _props.dropdownButtonId,
          onPerPageSelect = _props.onPerPageSelect,
          pagination = _props.pagination;


      var itemsStart = (this.currentPage - 1) * this.perPage + 1;
      var itemsEnd = Math.min(itemsStart + this.perPage - 1, this.itemCount);
      var totalPages = this.totalPages();

      return _react2.default.createElement(_PaginationRow2.default, {
        className: className,
        onSubmit: this.handleFormSubmit,
        viewType: viewType,
        pagination: pagination,
        pageInputValue: pageChangeValue,
        amountOfPages: this.totalPages(),
        itemCount: itemCount,
        itemsStart: itemsStart,
        itemsEnd: itemsEnd,
        messages: messages,
        dropdownButtonId: dropdownButtonId,
        onPerPageSelect: onPerPageSelect,
        onFirstPage: function onFirstPage() {
          return _this2.setPage(1);
        },
        onPreviousPage: function onPreviousPage() {
          return _this2.setPageRelative(-1);
        },
        onPageInput: function onPageInput(e) {
          return _this2.handlePageChange(e);
        },
        onNextPage: function onNextPage() {
          return _this2.setPageRelative(1);
        },
        onLastPage: function onLastPage() {
          return _this2.setPage(totalPages);
        }
      });
    }
  }]);

  return Paginator;
}(_react2.default.Component);

Paginator.propTypes = {
  /** Additional css classes */
  className: _propTypes2.default.string,
  /** pagination row view type */
  viewType: _propTypes2.default.oneOf(_PaginationConstants.PAGINATION_VIEW_TYPES).isRequired,
  /** user pagination settings */
  pagination: _propTypes2.default.shape({
    /** the current page */
    page: _propTypes2.default.number.isRequired,
    /** the current per page setting */
    perPage: _propTypes2.default.number.isRequired,
    /** per page options */
    perPageOptions: _propTypes2.default.array
  }).isRequired,
  /** calculated number of rows */
  itemCount: _propTypes2.default.number.isRequired,
  /** message text inputs for i18n */
  messages: _propTypes2.default.shape({
    firstPage: _propTypes2.default.string,
    previousPage: _propTypes2.default.string,
    nextPage: _propTypes2.default.string,
    lastPage: _propTypes2.default.string,
    perPage: _propTypes2.default.string,
    of: _propTypes2.default.string
  }),
  /** dropdown button id */
  dropdownButtonId: _propTypes2.default.string,
  /** A callback triggered when a page is switched */
  onPageSet: _propTypes2.default.func,
  /** per page selection callback */
  onPerPageSelect: _propTypes2.default.func
};
Paginator.defaultProps = {
  className: '',
  messages: {
    firstPage: 'First Page',
    previousPage: 'Previous Page',
    currentPage: 'Current Page',
    nextPage: 'Next Page',
    lastPage: 'Last Page',
    perPage: 'per page',
    of: 'of'
  },
  dropdownButtonId: 'pagination-row-dropdown',
  onPerPageSelect: _helpers.noop,
  onPageSet: _helpers.noop
};

exports.default = Paginator;