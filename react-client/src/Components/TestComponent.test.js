// MyComponent.test.js
import React from "react";
import { shallow } from "enzyme";
import TestComponent from "./TestComponent";

import testFunction from './testFunction';


describe("Testing jest mocks", () => {
  
  beforeEach(() => {

  });
  afterEach(() => {

  });


  it("Should mock functionMock", () => {

    const functionSpy = jest.spyOn(testFunction, 'functionMock');

    // testFunction.functionMock = jest.fn(() => "return value");
    functionSpy.mockImplementation((param) => "return value"); //we can either use jest.fn or mockImplementation to mock return value

    
    const result = testFunction.functionMock(2);

    expect(result).toBe("return value");
    expect(testFunction.functionMock).toHaveBeenCalledWith(2);
  });


});



describe("<TestComponent />", () => {
  let wrapper;
  const setState = jest.fn(() => "return value");
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]); //for mocking React hooks state


  beforeEach(() => {
    wrapper = shallow(<TestComponent />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Component mounted", () => {

    it("should contain button countdown component", () => {
      // arrange
      const component = shallow(<TestComponent />);
      const btnCountDown = component.find("#count-down");


      // assert
      expect(btnCountDown).toHaveLength(1);
    });


  });

  describe("Counting", () => {

    describe("Count Up", () => {
      it("calls setCount with count + 1", () => {
        wrapper.find("#count-up").props().onClick();
        expect(setState).toHaveBeenCalledWith(1);
      });
    });

    describe("Count Down", () => {
      it("calls setCount with count - 1", () => {
        wrapper.find("#count-down").props().onClick();
        expect(setState).toHaveBeenCalledWith(-1);
      });
    });
  });

  describe("Label", () => {

    it("Sets label", () => {

      wrapper.find("#btn-setLabel").props().onClick();

      expect(setState).toHaveBeenCalledWith("Hello world!");
    });

  });

  describe("Zero", () => {
    it("calls setCount with 0", () => {
      wrapper.find("#zero-count").props().onClick();
      expect(setState).toHaveBeenCalledWith(0);
    });
  });


});
