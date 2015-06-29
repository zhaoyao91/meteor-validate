describe('basic validator', function () {
    describe('where', function () {
        function whereFunc(arg) {
            return arg === 5;
        }

        it('should be ok when satisfy', function () {
            expect(function () {
                validate(5).where(whereFunc)
            }).not.toThrow();
        });

        it('should throw when not satisfy', function () {
            expect(function () {
                validate(4).where(whereFunc).toThrow();
            })
        })
    });

    describe('exists', function () {
        it('should be ok when exists', function () {
            expect(function () {
                validate(1).exists()
            }).not.toThrow();
        });

        it('should throw when not exists', function () {
            expect(function () {
                validate(null).exists()
            }).toThrow();
            expect(function () {
                validate(undefined).exists()
            }).toThrow();
            expect(function () {
                validate().exists()
            }).toThrow();
        })
    });

    describe('isType', function () {
        it('should be ok when is the type', function () {
            expect(function () {
                validate(1).isType('number')
            }).not.toThrow();
        });

        it('should throw when is not the type', function () {
            expect(function () {
                validate(1).isType('string')
            }).toThrow();
        });

        it('should be ok when is one of the types', function () {
            expect(function () {
                validate(1).isType('number', 'string')
            }).not.toThrow();
            expect(function () {
                validate('1').isType(['number', 'string'])
            }).not.toThrow();
        });

        it('should throw when is not any of the types', function () {
            expect(function () {
                validate({}).isType('number', 'string')
            }).toThrow();
            expect(function () {
                validate({}).isType(['number', 'string'])
            }).toThrow();
        });
    });

    describe('isClass', function () {
        var A = function () {
        };
        var B = function () {
        };
        var C = function () {
        };

        var a = new A;
        var b = new B;
        var c = new C;

        it('should be ok when is the class', function () {
            expect(function () {
                validate(a).isClass(A)
            }).not.toThrow();
        });

        it('should throw when is not the class', function () {
            expect(function () {
                validate(a).isClass(B)
            }).toThrow();
        });

        it('should be ok when is one of the classes', function () {
            expect(function () {
                validate(a).isClass(A, B)
            }).not.toThrow();
            expect(function () {
                validate(b).isClass([A, B])
            }).not.toThrow();
        });

        it('should throw when is not any of the classes', function () {
            expect(function () {
                validate(c).isClass(A, B)
            }).toThrow();
            expect(function () {
                validate(c).isClass([A, B])
            }).toThrow();
        });
    });

    describe('eq', function () {
        it('should be ok when equals', function () {
            expect(function () {
                validate(1).eq(1)
            }).not.toThrow();
        });

        it('should throw when not equals', function () {
            expect(function () {
                validate(1).eq(2)
            }).toThrow();
        })
    });

    describe('neq', function () {
        it('should be ok when not equals', function () {
            expect(function () {
                validate(1).neq(2)
            }).not.toThrow();
        });

        it('should throw when equals', function () {
            expect(function () {
                validate(1).neq(1)
            }).toThrow();
        });
    });

    describe('gt', function () {
        it('should be ok when greater', function () {
            expect(function () {
                validate(5).gt(1)
            }).not.toThrow();
        });

        it('should throw when not greater', function () {
            expect(function () {
                validate(5).gt(8)
            }).toThrow();
            expect(function () {
                validate(5).gt(5)
            }).toThrow();
        })
    });

    describe('lt', function () {
        it('should be ok when less', function () {
            expect(function () {
                validate(1).lt(5)
            }).not.toThrow();
        });

        it('should throw when not less', function () {
            expect(function () {
                validate(5).lt(1)
            }).toThrow();
            expect(function () {
                validate(5).lt(5)
            }).toThrow();
        })
    });

    describe('ge', function () {
        it('should be ok when greater or equal', function () {
            expect(function () {
                validate(5).ge(1)
            }).not.toThrow();
            expect(function () {
                validate(5).ge(5)
            }).not.toThrow();
        });

        it('should throw when not greater or equal', function () {
            expect(function () {
                validate(5).ge(8)
            }).toThrow();
        })
    });

    describe('ge', function () {
        it('should be ok when less or equal', function () {
            expect(function () {
                validate(5).le(8)
            }).not.toThrow();
            expect(function () {
                validate(5).le(5)
            }).not.toThrow();
        });

        it('should throw when not less or equal', function () {
            expect(function () {
                validate(5).le(1)
            }).toThrow();
        })
    });

    describe('in', function () {
        it('should be ok when in', function () {
            expect(function () {
                validate(1).in(1, 2)
            }).not.toThrow();
            expect(function () {
                validate(2).in([1, 2])
            }).not.toThrow();
        });

        it('should throw when not in', function () {
            expect(function () {
                validate(3).in(1, 2);
            });
            expect(function () {
                validate(3).in([1, 2])
            });
        });
    });

    describe('notIn', function () {
        it('should be ok when not in', function () {
            expect(function () {
                validate(3).notIn(1, 2)
            }).not.toThrow();
            expect(function () {
                validate(3).notIn([1, 2])
            }).not.toThrow();
        });

        it('should throw when in', function () {
            expect(function () {
                validate(1).notIn(1, 2)
            }).toThrow();
            expect(function () {
                validate(2).notIn([1, 2])
            }).toThrow();
        })
    });

    describe('isUndefined', function () {
        it('should be ok when is undefined', function () {
            expect(function () {
                validate(undefined).isUndefined()
            }).not.toThrow();
        });

        it('should throw when is not undefined', function () {
            expect(function () {
                validate(null).isUndefined()
            }).toThrow();
        })
    });

    describe('isNull', function () {
        it('should be ok when is null', function () {
            expect(function () {
                validate(null).isNull()
            }).not.toThrow();
        });
        it('should throw when is not null', function () {
            expect(function () {
                validate(undefined).isNull();
            }).toThrow();
        })
    });

    describe('isNaN', function () {
        it('should be ok when is NaN', function () {
            expect(function () {
                validate(NaN).isNaN();
            }).not.toThrow();
        });
        it('should throw when is not NaN', function () {
            expect(function () {
                validate(null).isNaN();
            }).toThrow();
        })
    });

    describe('isBoolean', function () {
        it('should be ok when is boolean', function () {
            expect(function () {
                validate(true).isBoolean();
            }).not.toThrow();
        });
        it('should throw when is not boolean', function () {
            expect(function () {
                validate(1).isBoolean();
            }).toThrow();
        })
    });

    describe('isNumber', function () {
        it('should be ok when is number', function () {
            expect(function () {
                validate(1).isNumber();
            }).not.toThrow();
        });
        it('should throw when is not number', function () {
            expect(function () {
                validate('1').isNumber();
            }).toThrow();
        })
    });

    describe('isString', function () {
        it('should be ok when is string', function () {
            expect(function () {
                validate('s').isString();
            }).not.toThrow();
        });
        it('should throw when is not string', function () {
            expect(function () {
                validate(1).isString();
            }).toThrow();
        })
    });

    describe('isFunction', function () {
        it('should be ok when is function', function () {
            expect(function () {
                validate(function(){}).isFunction();
            }).not.toThrow();
        });
        it('should throw when is not function', function () {
            expect(function () {
                validate(1).isFunction();
            }).toThrow();
        })
    });

    describe('isObject', function () {
        it('should be ok when is object', function () {
            expect(function () {
                validate({}).isObject();
            }).not.toThrow();
        });
        it('should throw when is not object', function () {
            expect(function () {
                validate(1).isObject();
            }).toThrow();
        })
    });

    describe('isDate', function () {
        it('should be ok when is Date', function () {
            expect(function () {
                validate(new Date).isDate();
            }).not.toThrow();
        });
        it('should throw when is not Date', function () {
            expect(function () {
                validate(1).isDate();
            }).toThrow();
        })
    });

    describe('isArray', function () {
        it('should be ok when is array', function () {
            expect(function () {
                validate([]).isArray();
            }).not.toThrow();
        });
        it('should throw when is not boolean', function () {
            expect(function () {
                validate(1).isArray();
            }).toThrow();
        })
    });
});