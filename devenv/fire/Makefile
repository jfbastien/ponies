all: $(patsubst %.cc,%.pexe,$(wildcard *.cc))

CXX=pnacl-clang++
NACL_SDK_ROOT=/mnt/html5/packages/pnacl.x86_64
CXXFLAGS = -O2 -I$(NACL_SDK_ROOT)/include \
               -L$(NACL_SDK_ROOT)/lib/pnacl/Release
CXXFLAGS+= --pnacl-driver-verbose
LIBS = -lnacl_io -lppapi -lppapi_cpp

%.unfinal: %.cc
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $< -o $@ $(LIBS)

%.pexe: %.unfinal
	pnacl-finalize $< -o $@

%: %.pexe
	bash -c 'NACL_SPAWN_MODE=popup ./$<'

clean:
	bash -c 'rm -f *.pexe *.unfinal'
